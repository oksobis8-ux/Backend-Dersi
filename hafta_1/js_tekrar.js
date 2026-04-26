// let const var

let ad = "Mehmet"; //string
const yil = 2000; //number
let bilgi = true; //bool

let isimler = ["baran","nisa","goktug"] //array

    let ogrenci = {
        ad : "ahmet",
        okul : "çakir"
    }//object

    //koşullar
    if (2026-yil < 22){
        console.log("ogrenci kart")
    }else if (2026-yil >65){
        console.log("65 yaş üstü kart")
     } else {
        console.log ("tam kart")
     }

     //döngüler

     for (let i=0;i<isimler.length;i++){
        console.log("isimler[i]")
     }
 let sayac = 0
     while(true){
        console.log(isimler[sayac])
     
     if(sayac >= isimler[sayac]){
        break
     }
     sayac++}
    //en az bir kere çalıştır koşul sağlanmasa da
     do{
        console.log("sayac degeri : ",sayac, "bir kere çalistir")
     }while (sayac < 3);
     

     // foreach

     for (isim of isimler){
        console.log("isim :",isim)
     };
     
     //Fonksiyonlar
//parametreli dönüşümlü
     function veri_uret(a,b){
        return a+b
     };
     let sonuc = veri_uret (10.15);
     console.log(sonuc)
     function param_donussuz(a){
        console.log("donussuz")
     };
     param_donussuz(15)

     //ES6 sonrası
     //arrow function
     const carp = (a,b) => {
        return a*b;
     };
     console.log("carp(5):",carp(5))

    

    //class - OOP

    class Kullanici{

        constructor(kullanici_adi,sifre){
            this.kullanici_adi = kullanici_adi
            this.sifre = sifre
        }
    
    bilgi_yaz(){
        console.log("ad : ", this.kullanici_adi)
        console.log("sifre :", this.sifre)
    }
    static bilgi(){
        console.log("this olmadan")
    }
}
Kullanici.bilgi()
const kullanici1 = new Kullanici("osman","osman1234!");
kullanici1.bilgi_yaz()

