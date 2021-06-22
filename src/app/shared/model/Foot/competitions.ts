export class Competitions {
  id: number;
  area: {
    _id: string;
    id: number;
    name: string;
    ensignUrl: string;
  };
  code: string;
  currentSeason: {
    _id: string;
    id: number;
    startDate: Date;
    endDate: Date;
  };
  lastUpdated: Date;
  name: string;
}
