export default function Phrases() {
  const quotes = [
    "Il cambiamento non è mai doloroso. Solo la resistenza al cambiamento lo è. – Buddha",
    "Non puoi fermare le onde, ma puoi imparare a surfare. – Jon Kabat-Zinn",
    "La salute è il risultato non solo delle nostre azioni, ma anche dei nostri pensieri. – Mahatma Gandhi",
    "Ogni giorno è una nuova possibilità per cambiare la tua vita. – Anonimo",
    "Il corpo guarisce con il gioco, la mente con la risata e lo spirito con la gioia. – Proverbio africano",
    "La resilienza non è una singola abilità, è un insieme di abilità. – Jean Chatzky",
    "Abbi cura del tuo corpo, è l’unico posto in cui devi vivere. – Jim Rohn",
    "Il vero progresso è impossibile senza cambiamento. – George Bernard Shaw",
    "Le difficoltà rafforzano la mente, come il lavoro fa il corpo. – Seneca",
    "Non aspettare. Il tempo non sarà mai giusto. – Napoleon Hill",
    "Each workout is like a brick in a building, and every time you go in there and do a half-ass workout, you're not laying a brick down. Somebody else is. – Dorian Yates"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div style={{
      position: 'absolute',
      top: '81%',
      left: '45%',
      width: '50%',
      height: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '110%',
      fontStyle: 'italic'
    }}>
      {randomQuote}
    </div>
  );
}
