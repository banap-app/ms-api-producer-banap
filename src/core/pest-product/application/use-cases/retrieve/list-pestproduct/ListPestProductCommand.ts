export class ListPestProductCommand {
    public culture?: string
    public searchTerm?: string;
    constructor(props) {
        if(!props) return
        this.culture = props.culture
        this.searchTerm = props.searchTerm
    }
}