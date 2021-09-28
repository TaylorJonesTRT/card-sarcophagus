import axios from 'axios';

const fetchCards = async () => {
  const cardArray: void[] = [];

  // fetch the YGOPRODECK API
  const ygoCards = await axios
    .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then((response) => response.data.data);

  // iterate through the returned data

  // push data to array
};

fetchCards();
