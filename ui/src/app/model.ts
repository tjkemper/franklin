export class Deck {
    id: string;
    created: string; //unix time stamp
}

export class CardData {
    data: Card[];
    next: string;
    previous: string;
}

export class Card {
    id: number;
    deckId: string;
    startDate: string; //unix time stamp
    virtueData: VirtueData[];
    current: boolean;
}

export class VirtueData {
    virtue: string;
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
}

// Stats
export class Total {
    virtue: string;
    total: number
}