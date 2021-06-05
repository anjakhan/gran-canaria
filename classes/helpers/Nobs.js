export class NobsBase {
    constructor(nobs, source) {
        if (nobs instanceof Nobs && source instanceof NobsBase) {
            nobs._called_from_constructor_findMutations(source);
            for (const key of Object.keys(source)) {
                const value = source[key];
                if (value instanceof NobsBase) {
                    if (nobs.hasObjectReplacement(value)) {
                        this[key] = nobs.getObjectReplacement(value);
                    }
                    else if (nobs._called_from_constructor_hasMutation(value)) {
                        this[key] = new value.constructor(nobs, value);
                    }
                    else {
                        this[key] = value;
                    }
                }
                else if (value instanceof Map) {
                    this[key] = nobs._called_from_constructor_cloneMap(value);
                }
                else if (Array.isArray(value)) {
                    this[key] = nobs._called_from_constructor_cloneArray(value);
                }
                else {
                    if (nobs.hasProperty(source, key)) {
                        this[key] = nobs.popProperty(source, key);
                    }
                    else {
                        this[key] = source[key];
                    }
                }
            }
            const props = nobs.getChangedProperties(source);
            if (props && props.size > 0) {
                for (const [key, value] of props) {
                    this[key] = value;
                }
            }
        }
    }
}
export class Snobs {
    static setProperty(item, propertyName, propertyValue) {
        const r = new Nobs();
        return r.setProperty(item, propertyName, propertyValue);
    }
    static removeObject(x) {
        const r = new Nobs();
        return r.removeObject(x);
    }
    static addToCollection(parentCollection, newObject, insertBefore = undefined, insertAfter = undefined) {
        const r = new Nobs();
        return r.addToCollection(parentCollection, newObject, insertBefore, insertAfter);
    }
}
export class Nobs {
    constructor() {
        this.createdObjects = new Map();
        this.replacedObjects = new Map();
        this.removedObjects = new Set();
        this.changedProperties = new Map();
        this.replacedCollections = new Map();
        this.mutatedObjects = new Set();
    }
    setProperty(item, propertyName, propertyValue) {
        if (item && (propertyValue instanceof NobsBase || propertyValue === null) && item[propertyName] instanceof NobsBase) {
            this.replaceObject(item[propertyName], propertyValue);
        }
        else {
            let map = this.changedProperties.get(item);
            if (!map) {
                map = new Map();
                this.changedProperties.set(item, map);
            }
            map.set(propertyName, propertyValue);
        }
        return this;
    }
    getChangedProperties(item) {
        return this.changedProperties.get(item);
    }
    getProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        if (map && map.has(propertyName)) {
            return map.get(propertyName);
        }
        else {
            return item[propertyName];
        }
    }
    popProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        if (map && map.has(propertyName)) {
            const r = map.get(propertyName);
            map.delete(propertyName);
            return r;
        }
        else {
            return item[propertyName];
        }
    }
    hasProperty(item, propertyName) {
        const map = this.changedProperties.get(item);
        return !!(map && map.has(propertyName));
    }
    replaceCollection(find, replace) {
        this.replacedCollections.set(find, replace);
        return this;
    }
    addToCollection(parentCollection, newObject, insertBefore = undefined, insertAfter = undefined) {
        let ar = this.createdObjects.get(parentCollection);
        if (!ar) {
            ar = [];
            this.createdObjects.set(parentCollection, ar);
        }
        const newItem = {
            object: newObject,
            insertBefore: insertBefore,
            insertAfter: insertAfter
        };
        ar.push(newItem);
        return this;
    }
    reOrderInsideCollection(parentCollection, object, insertBefore = undefined, insertAfter = undefined) {
        if (object !== insertBefore && object !== insertAfter) {
            this.removeObject(object);
            this.addToCollection(parentCollection, object, insertBefore, insertAfter);
        }
        return this;
    }
    replaceObject(find, replace) {
        this.replacedObjects.set(find, replace);
        return this;
    }
    hasObjectReplacement(find) {
        return this.replacedObjects.has(find);
    }
    getObjectReplacement(find) {
        return this.replacedObjects.get(find);
    }
    removeObject(x) {
        this.removedObjects.add(x);
        return this;
    }
    _called_from_constructor_hasMutation(obj) {
        return this.mutatedObjects.has(obj);
    }
    _called_from_constructor_findMutations(source) {
        let ret = false;
        for (const key of Object.keys(source)) {
            const value = source[key];
            if (this.hasProperty(source, key)) {
                ret = true;
            }
            if (value instanceof NobsBase) {
                if (this.replacedObjects.has(value) || this._called_from_constructor_findMutations(value)) {
                    this.mutatedObjects.add(value);
                    ret = true;
                }
            }
            else if (value instanceof Map || Array.isArray(value)) {
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
                }
                else {
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
    static getId(obj) {
        const objectId = obj["id"];
        if (!objectId) {
            throw new Error("Nobs: By convention, objects stored in a Map need to have an 'id' property");
        }
        return objectId;
    }
    _called_from_constructor_cloneMap(collection) {
        const ret = new Map();
        const replacedCollection = this.replacedCollections.get(collection);
        if (replacedCollection && replacedCollection instanceof Map) {
            return replacedCollection;
        }
        let obj;
        const newItems = this.createdObjects.get(collection);
        for (const [id, itm] of collection.entries()) {
            if (!this.removedObjects.has(itm)) {
                obj = this.replacedObjects.get(itm);
                if (!obj && this.mutatedObjects.has(itm)) {
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
                ret.set(id, obj);
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
    _called_from_constructor_cloneArray(collection) {
        const ret = [];
        const replacedCollection = this.replacedCollections.get(collection);
        if (replacedCollection && Array.isArray(replacedCollection)) {
            return replacedCollection;
        }
        let obj;
        const newItems = this.createdObjects.get(collection);
        for (const itm of collection) {
            if (!this.removedObjects.has(itm)) {
                obj = this.replacedObjects.get(itm);
                if (!obj && this.mutatedObjects.has(itm)) {
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
                ret.push(obj);
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
//# sourceMappingURL=Nobs.js.map