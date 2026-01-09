export interface ChatworkRoom {
  room_id: number;
  name: string;
  type: string;
  role: string;
  sticky: boolean;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
  message_num: number;
  file_num: number;
  task_num: number;
  icon_path: string;
  last_update_time: number;
}

export interface ChatworkAccount {
  account_id: number;
  name: string;
  avatar_image_url: string;
}

export interface ChatworkMessage {
  message_id: string;
  account: ChatworkAccount;
  body: string;
  send_time: number;
  update_time: number;
}

export interface ChatworkMember {
  account_id: number;
  role: string;
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  avatar_image_url: string;
}

export interface ChatworkTask {
  task_id: number;
  room: {
    room_id: number;
    name: string;
    icon_path: string;
  };
  assigned_by_account: {
    account_id: number;
    name: string;
    avatar_image_url: string;
  };
  message_id: string;
  body: string;
  limit_time: number;
  status: "open" | "done";
  limit_type: "none" | "date" | "time";
}
