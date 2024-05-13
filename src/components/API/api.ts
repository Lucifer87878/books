// api.ts
import coverImg from '../../images/book-no-cover.jpg';
const URL = "https://openlibrary.org/works/";

export interface BookDetails {
  description: string;
  title: string;
  cover_img: string;
  subject_places: string;
  subject_times: string;
  subjects: string;
}

export async function fetchBookDetails(id: string): Promise<BookDetails | null> {
  try {
    const response = await fetch(`${URL}${id}.json`);
    const data = await response.json();

    if (data) {
      const { description, title, covers, subject_places, subject_times, subjects } = data;
      const newBook: BookDetails = {
        description: description ? description.value : "No description found",
        title: title,
        cover_img: covers && covers.length > 0 ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
        subject_places: subject_places ? subject_places.join(", ") : "No Subject places found",
        subject_times: subject_times ? subject_times.join(", ") : "No Subject times found",
        subjects: subjects ? subjects.join(", ") : "No Subjects found",
      };
      return newBook;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

//---------------------------------------------------------------------------------------------------------------//


interface WantToReadBook {
  title: string;
  author_names: string[];
  first_publish_year: number;
  cover_id: number;
  cover_edition_key: string;
}

export async function fetchWantToReadBooks(): Promise<BookDetails[]> {
  try {
    const response = await fetch("https://openlibrary.org/people/mekBot/books/want-to-read.json");
    const data = await response.json();

    if (data && data.reading_log_entries) {
      const readingLogEntries: WantToReadBook[] = data.reading_log_entries;
      const booksDetails: BookDetails[] = [];

      for (const entry of readingLogEntries) {
        const newBook: BookDetails = {
          description: "No description found",
          title: entry.title,
          cover_img: `https://covers.openlibrary.org/b/id/${entry.cover_id}-L.jpg`,
          subject_places: "No Subject places found",
          subject_times: "No Subject times found",
          subjects: "No Subjects found",
        };
        booksDetails.push(newBook);
      }
      
      return booksDetails;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

//---------------------------------------------------------------------------------------------------------------//
  
interface CurrentlyReadingBook {
  title: string;
  author_names: string[];
  first_publish_year: number;
  cover_id: number;
  edition_key: string[];
}

export async function fetchCurrentlyReadingBooks(): Promise<BookDetails[]> {
  try {
    const response = await fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json");
    const data = await response.json();

    if (data && data.reading_log_entries) {
      const readingLogEntries: CurrentlyReadingBook[] = data.reading_log_entries;
      const booksDetails: BookDetails[] = [];

      for (const entry of readingLogEntries) {
        const newBook: BookDetails = {
          description: "No description found",
          title: entry.title,
          cover_img: `https://covers.openlibrary.org/b/id/${entry.cover_id}-L.jpg`,
          subject_places: "No Subject places found",
          subject_times: "No Subject times found",
          subjects: "No Subjects found",
        };
        booksDetails.push(newBook);
      }
      
      return booksDetails;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

//---------------------------------------------------------------------------------------------------------------//
  
interface AlreadyReadBook {
  title: string;
  author_names: string[];
  first_publish_year: number;
  cover_id: number;
  cover_edition_key: string;
}

export async function fetchAlreadyReadBooks(): Promise<BookDetails[]> {
  try {
    const response = await fetch("https://openlibrary.org/people/mekBot/books/already-read.json");
    const data = await response.json();

    if (data && data.reading_log_entries) {
      const readingLogEntries: AlreadyReadBook[] = data.reading_log_entries;
      const booksDetails: BookDetails[] = [];

      for (const entry of readingLogEntries) {
        const newBook: BookDetails = {
          description: "No description found",
          title: entry.title,
          cover_img: `https://covers.openlibrary.org/b/id/${entry.cover_id}-L.jpg`,
          subject_places: "No Subject places found",
          subject_times: "No Subject times found",
          subjects: "No Subjects found",
        };
        booksDetails.push(newBook);
      }
      
      return booksDetails;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}


//------------------------------------------------------------------------------------------------------------//



/*
detta är så att man kan söka på flera olika saker inklusive inehåll av böker m.m

All details of a subject
When query parameter details=true is passed, related subjects, prominent publishers, prolific authors and publishing_history are also included in the response.

Sample Request:

GET /subjects/love.json?details=true
Sample Response:

{
    "key": "/subjects/love",
    "name": "Love",
    "subject_type": "subject",
    "work_count": 4918,
    "ebook_count": 497,
    "works": [
        {
            "key": "/works/OL66534W",
            "title": "Pride and prejudice",
            "edition_count": 752,
            "authors": [
                {
                    "name": "Jane Austen",
                    "key": "/authors/OL21594A"
                }
            ],
            "has_fulltext": true,
            "ia": "mansfieldparknov03aust",
            ...
        },
        ...
    ],
    "authors": [
        {
            "count": 28,
            "name": "Plato",
            "key": "/authors/OL12823A"
        },
        {
            "count": 21,
            "name": "Ruoquan Wu",
            "key": "/authors/OL5638565A"
        },
        ...
    ],
    "publishers": [
        {
            "count": 54,
            "name": "Sine nomine"
        },
        {
            "count": 44,
            "name": "Bantam Books"
        },
        ...
    ],
    "subjects": [
        {
            "count": 914,
            "name": "Religious aspects of Love",
            "key": "/subjects/religious_aspects_of_love"
        },
        {
            "count": 887,
            "name": "Christianity",
            "key": "/subjects/christianity"
        },
        ...
    ],
    "people": [
        {
            "count": 44,
            "name": "Jesus Christ",
            "key": "/subjects/person:jesus_christ"
        },
        {
            "count": 42,
            "name": "Plato",
            "key": "/subjects/person:plato"
        },
        ...
    ],
    "places": [
        {
            "count": 80,
            "name": "United States",
            "key": "/subjects/place:united_states"
        },
        {
            "count": 36,
            "name": "France",
            "key": "/subjects/place:france"
        },
        ...
    ],
    "times": [
        {
            "count": 54,
            "name": "20th century",
            "key": "/subjects/time:20th_century"
        },
        ...
    ]
    "publishing_history": [
        [1492, 2],
        [1494, 1],
        ...,
        [2009, 119],
        [2010, 56]
    ]
}

*/


//---------------------------------------------------------------------------------------------------------//

/* 
Detta är för att kunna söka på Författare

Searching for Authors
You can search for authors using the https://openlibrary.org/search/authors.json search API which accepts q as a query parameter:

https://openlibrary.org/search/authors.json?q=j%20k%20rowling

{
  numFound: 1,
  start: 0,
  numFoundExact: true,
  docs: [
    {
      key: "OL23919A",
      text: [...],
      type: "author",
      name: "J. K. Rowling",
      alternate_names: [...],
      birth_date: "31 July 1965",
      top_work: "Harry Potter and the Philosopher's Stone",
      work_count: 162,
      top_subjects: [...],
      _version_: 1702166143068799000
    },
  ]
}

*/