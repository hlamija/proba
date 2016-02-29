***********************
Configuration Management
=======

Potrebno je kreirati aplikativno rješenje koje će krajnjem korisniku omogućiti jednostavno i efikasno upravljanje konfiguracijama. 

##Opis problema

Prilikom razvoja aplikativnog softvera koji se isporučuje širem skupu klijenata, značajan izazov predstavlja rješavanje problema upravljanja zavisnostima koje su po svojoj prirodi promjenjive (npr. adresa web servisa). Poželjno bi bilo da izmjena jedne od zavisnosti ne zahtijeva pakovanje, distribuciju i ponovnu instalaciju dijela ili kompletnog aplikativnog rješenja. 

Jedan od načina rješavanje ovog problema jeste izmještanje i apstrakcija svih zavisnosti u jedinstvenu cjelinu.
Ovako formiranu cjelinu (**konfiguraciju**) je potom moguće mijenjati po želji bez izmjene koda unutar samog aplikativnog rješenja, čime se problem redistribucije uopće i ne pojavljuje.

U kontekstu ovog zadatka konfiguracija se smatra **kolekcijom parametara**. 


## Opis rješenja

Potrebno je kreirati aplikativno rješenje koje će korisniku omogućiti kreiranje, izmjenu i brisanje **konfiguracija** i njenih **parametara**.

Svaka konfiguracija opisana je uz pomoć slijedećih vrijednosti:

 1. **name** - `naziv konfiguracije (String)`  
 2. **description** - `opis sadržaja konfiguracije (String)`
 3. **version** - `tekstualni opis verzije konfiguracije (String)`

Svaka konfiguracija može sadržavati 0 ili više **parametara**.
Svaki parametar može imati **proizvoljan broj atributa** koji ga opisuju, ali u najužem skupu svaki parametar **mora** sadržavati slijedeći skup atributa:

 2. **name** - `naziv parametra (String)`
naziv podliježe istom kriteriju validacije kao i naziv varijable u nekom programskom jeziku, C, C++, Java, C#, tj. naziv ne smije sadržavati specijalne ili prazne znakove i naziv mora početi slovom.
 3. **value** - `vrijednost parametra (String ili kolekcija parametara)`
Vrijednost parametra može biti ili tekst proizvoljne dužine ili kolekcija parametara.
 4. **description** - `opis parametra (String)`
Ovaj atribut sadrži tekstualnu vrijednost proizvoljne dužine

Pored navedenih obaveznih parametara može sadržavati proizvoljan broj **dodatnih atributa**. 
Prilikom definisanja dodatnih atributa potrebno je voditi računa o slijedećem:

 - naziv atributa podliježe istom kriteriju kao i naziv varijable u
   nekom programskom jeziku, npr C, C++, Java, C#, tj. naziv ne smije
   sadržavati specijalne ili prazne znakove i naziv mora početi slovom.
 - vrijednost atributa mora biti ili tekstualna vrijednost ili **kolekcija parametara**

Pored navedenih funkcionalnosti aplikativno rješenje treba podržavati funkcionalnost eksportovanja konfiguracije u tekstualni XML ili JSON format.

### Primjer konfiguracije

    {
    	name: "sampleConfiguration",
    	description: "Configuration used for demonstration purposes"
    	version: "1.0",
    	parameters: [
	    	{
		    	name: "sampleParameter",
		    	description: "parameter description",
		    	value: "20",
		    	enabled: "1"
	    	},
	    	{
		    	name: "items",
		    	description: "parameter with subparameters",
		    	value:[
			    	{
				    	name: "item",
				    	description: "nested parameter",
				    	value: "13"
			    	},
			    	{
				    	name: "item",
				    	description: "nested parameter 2",
				    	value: "TEST"
			    	}
		    	]
	    	}
    	]
    }

Primjer XML eksporta:

    <?xml version="1.0"?>
    <sampleConfiguration version="1.0" description="Configuration used for demonstration purposes">
    	<params>
    		<sampleParameter enabled="1" description="parameter description">20</sampleParameter>
    		<items description="parameter with subparameters">
    			<item description="nested parameter">13</item>
    			<item description="nested parameter 2">TEST</item>
    		</items>
    	</params>
    </sampleConfiguration>

## Detalji aplikacije
Aplikativno rješenje može biti realizirano koristeći bilo koji framework i proizvoljnu referentnu arhitekturu, ali je pri realizaciji rješenja potrebno voditi računa o zahtjevu da konačno rješenje bude portabilno. Portabilnost u ovom kontekstu podrazumijeva mogućnost kopiranja rješenja na prenosni medij (CD, USB) i izvršavanje rješenja sa datog medija bez dodatnih instalacija i konfiguracija.
Zbog navedenih razloga kao razvojno okruženje predlažemo korištenje **backbone.js** javascript biblioteke kao frameworka za razvoj SinglePage web aplikacija.
