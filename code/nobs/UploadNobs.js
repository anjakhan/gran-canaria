import { Nobs, NobsBase } from "../../classes/helpers/Nobs";
export class UploadNobs extends NobsBase {
    constructor(nobs_or_dto, source) {
        super(nobs_or_dto, source);
        if (!(nobs_or_dto instanceof Nobs) && !(source instanceof UploadNobs)) {
            const model = nobs_or_dto;
            this.id = "";
            this.headline = model.headline ?? "";
            this.story = model.story ?? [];
            this.date = model.date ?? new Date();
            this.location = model.location ?? [];
            this.foldername = model.foldername ?? "";
            this.popup = model.popup ?? "";
            this.image = model.image ?? "";
        }
    }
    ;
    toDto() {
        return {
            id: "",
            headline: this.headline,
            story: this.story,
            date: this.date,
            location: this.location,
            foldername: this.foldername,
            popup: this.popup,
            image: this.image
        };
    }
    ;
}
;
//# sourceMappingURL=UploadNobs.js.map