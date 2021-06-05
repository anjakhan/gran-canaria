export abstract class NobsBase {
  //abstract id: string;

  protected constructor(nobs: Nobs | any, source: NobsBase | any) {
    if (nobs instanceof Nobs && source instanceof NobsBase) {

      nobs._called_from_constructor_findMutations(source);

      for (const key of Object.keys(source)) {

        const value: unknown = (<any>source)[key];

        if (value instanceof NobsBase) {
          if (nobs.hasObjectReplacement(value)) {
            (<any>this)[key] = nobs.getObjectReplacement(value);

          } else if (nobs._called_from_constructor_hasMutation(value)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (<any>this)[key] = new value.constructor(nobs, value);
          } else {
            (<any>this)[key] = value;
          }

        } else if (value instanceof Map) {
          (<any>this)[key] = nobs._called_from_constructor_cloneMap(value);

        } else if (Array.isArray(value)) {
          (<any>this)[key] = nobs._called_from_constructor_cloneArray(value);

        } else {
          // any property
          if (nobs.hasProperty(source, key)) {
            (<any>this)[key] = nobs.popProperty(source, key);

          } else {
            (<any>this)[key] = (<any>source)[key];
          }

        }
      }

      // look up non extisting, remaining properties
      const props = nobs.getChangedProperties(source);
      if (props && props.size > 0) {
        for (const [key, value] of props) {
          (<any>this)[key] = value;
        }

      }

    }

  }

}

interface iObjectToAdd {
  object: NobsBase,
  insertBefore: NobsBase | undefined,
  insertAfter: NobsBase | undefined,
}

export class Snobs {

  static setProperty(item: unknown, propertyName: string, propertyValue: unknown): Nobs {  
    const r = new Nobs();
    return r.setProperty(item, propertyName, propertyValue);
  }

  static removeObject(x: unknown): Nobs {
    const r = new Nobs();
    return r.removeObject(x);
  }

  static addToCollection(parentCollection: unknown, newObject: NobsBase, insertBefore: NobsBase | undefined = undefined, insertAfter: NobsBase | undefined = undefined): Nobs {
    const r = new Nobs();
    return r.addToCollection(parentCollection, newObject, insertBefore, insertAfter);
  }

}

export class Nobs {
  // key is the collection
  private createdObjects: Map<unknown, Array<iObjectToAdd>> = new Map();
  private replacedObjects: Map<unknown, unknown> = new Map();
  private removedObjects: Set<unknown> = new Set();
  private changedProperties: Map<unknown, Map<string, any>> = new Map();
  private replacedCollections: Map<unknown, Map<string, NobsBase>  | ReadonlyMap<string, NobsBase> | Array<NobsBase> |  ReadonlyArray<NobsBase>> = new Map();

  private mutatedObjects: Set<unknown>;

  constructor() {
    this.mutatedObjects = new Set();
  }


  setProperty(item: unknown, propertyName: string, propertyValue: unknown): Nobs {


    if (item && (propertyValue instanceof NobsBase || propertyValue === null) && (<any>item)[propertyName] instanceof NobsBase) {
      // add this as update object

      this.replaceObject((<any>item)[propertyName], propertyValue)
    } else {
      let map = this.changedProperties.get(item);
      if (!map) {
        map = new Map();
        this.changedProperties.set(item, map);
      }

      map.set(propertyName, propertyValue);
    }

    return this;
  }


  getChangedProperties(item: unknown): Map<string, any> | undefined {
    return this.changedProperties.get(item);
  }


  getProperty(item: unknown, propertyName: string): any {
    const map = this.changedProperties.get(item);
    if (map && map.has(propertyName)) {
      return map.get(propertyName);
    } else {

      return (<any>item)[propertyName];
    }

  }

  popProperty(item: unknown, propertyName: string): any {
    const map = this.changedProperties.get(item);
    if (map && map.has(propertyName)) {
      const r = map.get(propertyName);
      map.delete(propertyName);
      return r;

    } else {


      return (<any>item)[propertyName];
    }

  }

  hasProperty(item: unknown, propertyName: string): boolean {
    const map = this.changedProperties.get(item);
    return !!(map && map.has(propertyName));
  }

  replaceCollection(
    find: Map<string, NobsBase> | ReadonlyMap<string, NobsBase> | Array<NobsBase> | ReadonlyArray<NobsBase>,
    replace: Map<string, NobsBase> | ReadonlyMap<string, NobsBase> | Array<NobsBase> |  ReadonlyArray<NobsBase>): Nobs {

    this.replacedCollections.set(find, replace);
    return this;
  }

  addToCollection(parentCollection: unknown, newObject: NobsBase, insertBefore: NobsBase | undefined = undefined, insertAfter: NobsBase | undefined = undefined): Nobs {

    let ar = this.createdObjects.get(parentCollection);
    if (!ar) {
      ar = [];
      this.createdObjects.set(parentCollection, ar)
    }
    const newItem = {
      object: newObject,
      insertBefore: insertBefore,
      insertAfter: insertAfter
    };

    /*   if (newObject.hasOwnProperty("order") && ar.length > 0 && !insertBefore && !insertAfter) {
           for (let i = 0; i < ar.length; i++) {
               // @ts-ignore
               if (ar[i].object.order > newObject.order) {
                   if (i === 0) {
                       ar.unshift(newItem);
                   } else {
                       ar.splice(i, 0, newItem);
                   }
                   return this;
               }
           }
       }*/

    ar.push(newItem);
    return this;
  }

  reOrderInsideCollection(parentCollection: unknown, object: NobsBase, insertBefore: NobsBase | undefined = undefined, insertAfter: NobsBase | undefined = undefined): Nobs {
    if (object !== insertBefore && object !== insertAfter) {
      // would fail, since the removed object is not in the list anymore
      this.removeObject(object);
      this.addToCollection(parentCollection, object, insertBefore, insertAfter);
    }

    return this;
  }

  replaceObject(find: unknown, replace: unknown): Nobs {
    this.replacedObjects.set(find, replace);
    return this;
  }

  hasObjectReplacement(find: unknown): boolean {
    return this.replacedObjects.has(find);
  }

  getObjectReplacement(find: unknown): any {
    return this.replacedObjects.get(find);
  }

  removeObject(x: unknown): Nobs {
    this.removedObjects.add(x);
    return this;
  }


  _called_from_constructor_hasMutation(obj: unknown): boolean {
    return this.mutatedObjects.has(obj);
  }

  // finds mutations along the hirachy and adds them to a Set
  _called_from_constructor_findMutations(source: NobsBase): boolean {

    let ret: boolean = false;
    for (const key of Object.keys(source)) {

      const value = (<any>source)[key];


      if (this.hasProperty(source, key)) {
        ret = true;
      }

      if (value instanceof NobsBase) {

        if (this.replacedObjects.has(value) || this._called_from_constructor_findMutations(value)) {
          this.mutatedObjects.add(value);
          ret = true;
        }

      } else if (value instanceof Map || Array.isArray(value)) {
        if (this.replacedCollections.has(value)) {
          this.mutatedObjects.add(value);
          ret = true;
        }
        if (value instanceof Map) {
          for (const itm of value.values()) {
            if (this.removedObjects.has(itm) || this.replacedObjects.has(itm)) {
              this.mutatedObjects.add(itm);
              ret = true;
            }
            ret = this._called_from_constructor_findMutations(itm) || ret;
          }
        } else {
          for (const itm of value) {
            if (this.removedObjects.has(itm) || this.replacedObjects.has(itm)) {
              this.mutatedObjects.add(itm);
              ret = true;
            }
            ret = this._called_from_constructor_findMutations(itm) || ret;
          }
        }

        if (this.createdObjects.has(value)) {
          ret = true;
        }

      }
    }
    if (ret) {
      this.mutatedObjects.add(source);
    }
    return ret;
  }

  private static getId(obj: unknown): string {

    const objectId = (<any>obj)["id"];
    if (!objectId) {
      throw new Error("Nobs: By convention, objects stored in a Map need to have an 'id' property");
    }
    return objectId;
  }

  _called_from_constructor_cloneMap(collection: Map<string, NobsBase>): Map<string, NobsBase> {

    const ret: Map<string, NobsBase> = new Map();

    const replacedCollection = this.replacedCollections.get(collection);
    if (replacedCollection && replacedCollection instanceof Map) {
      return replacedCollection;
    }

    let obj: unknown | undefined;
    const newItems: Array<iObjectToAdd> | undefined = this.createdObjects.get(collection);

    // determine order if applicable, new items are already in order, just check #1
    /*    if (newItems && newItems.length > 0) {
            let newItem = newItems.values().next().value
            if (!newItem.insertAfter && !newItem.insertBefore && newItem.object.hasOwnProperty("order")) {
                // @ts-ignore
                let order: number = newItem.object.order;
                // find slot, todo: optimize via binary search
                for (let itm of collection.values()) {
                    // @ts-ignore
                    if (itm.order > order) {
                        newItem.insertBefore = itm;
                    }
                }
            }
        }*/


    for (const [id, itm] of collection.entries()) {
      if (!this.removedObjects.has(itm)) {


        obj = this.replacedObjects.get(itm);

        if (!obj && this.mutatedObjects.has(itm)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          obj = new itm.constructor(this, itm);
        }

        if (!obj) {
          obj = itm;
        }

        if (newItems) {
          for (const newItem of newItems) {
            if (newItem.insertBefore === obj) {
              ret.set(Nobs.getId(newItem.object), newItem.object);
            }
          }
        }

        ret.set(id, <NobsBase>obj);

        if (newItems) {
          for (const newItem of newItems) {
            if (newItem.insertAfter === obj) {
              ret.set(Nobs.getId(newItem.object), newItem.object);
            }
          }
        }

      }
    }


    if (newItems) {
      for (const newItem of newItems) {
        if (newItem.insertBefore === undefined && newItem.insertAfter === undefined) {
          ret.set(Nobs.getId(newItem.object), newItem.object);
        }
      }
    }
    return ret;
  }


  _called_from_constructor_cloneArray(collection: Array<NobsBase>): Array<NobsBase> {


    const ret: Array<NobsBase> = [];
    const replacedCollection = this.replacedCollections.get(collection);
    if (replacedCollection && Array.isArray(replacedCollection)) {
      return replacedCollection;
    }

    let obj: unknown | undefined;
    const newItems: Array<iObjectToAdd> | undefined = this.createdObjects.get(collection);

    for (const itm of collection) {
      if (!this.removedObjects.has(itm)) {


        obj = this.replacedObjects.get(itm);

        if (!obj && this.mutatedObjects.has(itm)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          obj = new itm.constructor(this, itm);
        }

        if (!obj) {
          obj = itm;
        }


        if (newItems) {
          for (const newItem of newItems) {
            if (newItem.insertBefore === obj) {
              ret.push(newItem.object);
            }
          }
        }

        ret.push(<NobsBase>obj);

        if (newItems) {
          for (const newItem of newItems) {
            if (newItem.insertAfter === obj) {
              ret.push(newItem.object);
            }
          }
        }

      }
    }

    if (newItems) {
      for (const newItem of newItems) {
        if (newItem.insertBefore === undefined && newItem.insertAfter === undefined) {
          ret.push(newItem.object);
        }
      }
    }


    return ret;
  }


}