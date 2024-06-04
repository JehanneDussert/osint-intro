export type Item = {
  name: string;
  summary: string;
  ended: string | null;
  image: string;
};

export type FormData = {
  label: string,
  name: string,
  type: string,
  accept ?: string
};

export type PersonalData = {
  addresses: string[]
  phone_numbers: string[]
  dates: string[]
  emails: string[]
}

export interface EngineInfo {
  title: string;
  url: string;
  reduced_url: string;
  sentiment: number;
  average_sentiment: number;
  language: string;
  personal_data: PersonalData;
}

export interface NetworkAppearances {
  type: string;
  appearances: number;
}

export interface Network {
	id: number;
	label: string;
	value: number;
}