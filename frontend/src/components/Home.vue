 <template>
    <div id='home'>
        <section id="showcase"> 
            <div class="container">
                <h1>Univerzalno softversko rešenje u polju medicine</h1>
                <p>Bilo da ste član medicinskog osoblja koji hoće da olakša organizaciju svog posla ili neko ko želi brzo i jednostavno da zakaže željeni pregled MedicApp je aplikacija za vas.</p>
                </div>
        </section>

        <section id="newsletter">
            <div class="container">
                <h1>Još uvek niste naš član? Postanite odmah...</h1>
                <form>
                    <router-link to='/registration' class="nav-link" exact> <button type='submit' class="btn button_1" id='btnRegistration'>Registration</button> </router-link>
                </form>
            </div>
        </section>

        <section id="boxes">
            <div class="container">
                <div class="box" id='box1'>                        
                    <img :src="image" />
                    <h3>Za pacijente</h3>
                    <p>Veliki izbor klinika i različitih vrsta pregleda na jednom mestu. Lako i brzo odaberite pregled koji vas interesuje i zakažite ga u samo nekoliko klikova! Mogućnost ažuriranja sopstvenog profila, kao i pristup istorijatu svih poseta lekaru.</p>
                </div>
                <div class="box" id='box2'>
                    <img src='@/assets/medSign.png'>
                    <h3>Za medicinsko osoblje</h3>
                    <p>Jednostavan i brz način zakazivanja, opisa izvršenog pregleda kao i izmena starih pregleda. Veoma jasan i jednostavan za upotrebu radni kalendar sa svim vašim obavezama, uz mogućnost zakazivanje godišnjih odmora.</p>
                </div>
                <div class="box" id='box3'>
                    <img src='@/assets/functions.jpg'>
                    <h3>Kažite nam Vaše utiske</h3>
                    <p>Vaše mišljenje nam je bitno. Ocenite lekare i kliniku, ostavite komentar i pomozite nam da postanemo još bolji, uz mogućnost ostvarivanja popuste na naše usluge.</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import image from '@/assets/red-first-aid-cross.jpg' 
export default {
    name: 'Home',
    data:function(){
        return {
            image:image
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
    background-color:#f4f4f4;
    margin:0;
    padding:0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    line-height: 1.5em;
    /*isto*/
    font: 15px 1.5em Arial, Helvetica, sans-serif;
}

/*global*/
.container{
    width:80%;
    margin:auto;
    overflow: hidden;
}

.button_1{
    height:38px;
    background-color:#e8491d;
    color:#fff;
    border:none;
    padding: 0 20px;
}

.dark{
    padding:15px;
    background-color:#35424a;
    color:#fff;
    margin:10px 0;
}

.button_1:hover{
    background-color:#cccccc;
    color:#fff;
    font-weight: bold;
}
/*Header*/
#main-header{
    background-color:#35424a;
    color:#fff;
    padding-top:30px;
    min-height: 70px;
    border-bottom:#e8491d 3px solid;
}

#main-header #branding{
    float:left;
    margin:0;
}

ul{
   margin:0;
   padding:0;
}
#main-header li{
    /*ili float:left;*/
    display:inline;
    padding:0 20px 0 20px;;
}

#main-header a{
    text-decoration: none;
    color: #fff;
    text-transform: uppercase;
    font-size:16px;
}

#main-header a:hover{
    color:#cccccc;
    font-weight: bold;
}

#navbar{
    float:right;
    padding-top:10px;
}

#main-header .highlight, #main-header .current a{
    color:#e8491d;
    font-weight: bold;
}


/*Showcase*/

#showcase{
    min-height:400px;
    /*background: url('../images/showcase.jpg') no-repeat 0 -400px;*/
    background-image:url('../assets/showcaseMed.jpg');
    background-repeat: no-repeat;
    background-position: -170px -80px;
    text-align: center;
    color:#35424a;
}

#showcase h1{
    margin-top:100px;
    font-size:55px;
    line-height: 1.5em;
    margin-bottom:10px;
}

#showcase p{
    font-size: 20px;
}

/*Newsletter*/

#newsletter{
    padding:15px;
    background-color:#35424a;
    color:#fff;
}

#newsletter h1{
   float:left;
}

#newsletter form{
    float:right;
    padding-top:5px;
 }

 #newsletter input[type="email"]{
    width:250px;
    padding:4px;
    height:25px;
 }

 /*Boxes*/

#boxes{
    margin-top:20px;
}

#boxes .box{
    float:left;
    width:33.3%;
    padding:10px;
    text-align:center;
    box-sizing: border-box;
}

#boxes .box img{
    width:100px;
}

#boxes #box2 img{
    margin-bottom: 3px;
}

#boxes #box3 img{
    margin-bottom: 15px;
}


</style>

