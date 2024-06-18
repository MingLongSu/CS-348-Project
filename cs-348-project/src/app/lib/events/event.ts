export interface IEvent {
    event_id: string;
    name: string;
    location: string;
    curr_capacity: number;
    max_capacity: number;
    owner_id: string;
    category: string;
    description: string;
    start_time:Date;
    end_time:Date;
    active:Boolean;
  }


export interface ICreateEvent {
  name: string;
  location: string;
  curr_capacity: number;
  max_capacity: number;
  owner_id: string;
  category: string;
  description: string;
  start_time:Date;
  end_time:Date;
  active:Boolean;
}
