export default class GotService {
    constructor(){
        this._apiBase = 'https://anapioficeandfire.com/api'
    }
    async getResourse(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Coudn't fetch ${url}` + `,received ${res.status}`)
        }
        return await res.json();
    }
    getAllCharacters(){
        return this.getResourse(`/characters?page=5&pageSize=10`);
    }
    getCharacter(id){
        return this.getResourse(`/characters/${id}`);
    }
    getAllHouses(){
        return this.getResourse(`/houses`);
    }
    getHouse(id){
        return this.getResourse(`/houses/${id}/`);
    }
    getAllBooks(){
        return this.getResourse(`/books`);
    }
    getHouse(id){
        return this.getResourse(`/books/${id}/`);
    }
}