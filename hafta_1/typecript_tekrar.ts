let yas : number = 10;
let isim : string ="backend dersi";

// ts dosyalarını çalıştırmak için 
// npx ts-node ./hafta_1/DOSYANIN_İSMİ.ts

let hazir_mi : boolean = true

// Interface -> arayüzler
interface Iogrenci{
    isim:string;
    soyisim:string;
    yas:number;
    mezun:boolean;
}

let ogrenci : Iogrenci = {
    isim : "Mehmet",
    soyisim : "taka",
    yas : 16,
    mezun : false
}

class Araba{
    public marka : string;
    public hiz : number;
    
    constructor (marka:string,hiz:number){
        this.marka = marka
        this.hiz = hiz
    }
    vites_arttir(vites_numarasi:number){
        const artacak_hiz : number = vites_numarasi * 15;
        this.hiz = this.hiz + artacak_hiz;
        return this.hiz;

    }
}

const araba1 = new Araba("BMW",10);
let son_hiz = araba1.vites_arttir(4); 
console.log("son hız:",son_hiz)

//ÖDEV capsülation ve polimorfizim class typescipt ile