export interface Experience {
  place: string;
  position: string;
  description: string;
  startedAt: Date;
  endedAt?: Date;
}

export const experience: Experience[] = [
  {
    place: "ST Consultores",
    position: "Java Jr. Dev",
    description: "Worked with Java and PostgreSQL in an BPM environment",
    startedAt: new Date(2019, 7, 1),
    endedAt: new Date(2019, 11, 31),
  },
  {
    place: "Senpai Academi",
    position: "Fullstack Developer Teacher",
    description: "Teach a course about becoming a fullstack developer",
    startedAt: new Date(2021, 5, 1),
    endedAt: new Date(2021, 10, 31),
  },
  {
    place: "Moove-It",
    position: "Fullstack developer",
    description: "Javascript fullstack developer",
    startedAt: new Date(2020, 2, 10),
  },
  {
    place: "Hulu",
    position: "Consultant",
    description:
      "Working as part of the Instrumentation team on behalf of Moove-it",
    startedAt: new Date(2020, 5, 1),
  },
];
