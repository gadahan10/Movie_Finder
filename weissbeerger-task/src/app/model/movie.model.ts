export interface MovieBase {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface ImdbResult {
    totalResults: number;
    Search: MovieBase[];
    Response: boolean;
}

export class MovieExtended implements MovieBase {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Writer: string;
    Actors: string;
    Country: string;
    Awards: string;
    imdbRating: string;
    Runtime: string;
    Language: string;
    Plot: string;
    Director: string;
    Genre: string;
    imdbVotes: string;
}