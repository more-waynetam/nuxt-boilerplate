export interface IAssistant {
    _id?: string;
    name: string;
    description?: string;
    tools: {type:string}[];
    instructions: string;
    owner?: string;
    visibility: string;
    created?: string;
    updated?: string;
    llmModel: string;
    avatar?: string;
  }

export interface IThread {
    _id?: string;
    name: string;
    description?: string;
    owner?: string;
    assistantId: string;
    visibility: string;
    created?: string;
    updated?: string;
  }

  export interface IMessage {
    id?: string;
    object: string;
    created_at: number;
    thread_id: string;
    role: string;
    content: [
      {
        type: string;
        text: {
          value: string;
          annotations: [];
        };
      }
    ];
    file_ids: [];
    assistant_id: string;
    run_id: string;
    metadata: {};
  }

  export interface IRun{
    id: string;
    object: string;
    created_at: number;
    assistant_id: string;
    thread_id: string;
    status:
    | 'queued'
    | 'in_progress'
    | 'requires_action'
    | 'cancelling'
    | 'cancelled'
    | 'failed'
    | 'completed'
    | 'expired';
    started_at: number;
    expires_at: number;
    cancelled_at: number;
    failed_at: number;
    completed_at: number;
    last_error: string;
    model: string;
    instructions: string;
    tools: [];
    file_ids: [];
    metadata: {};
    steps?: IStep[];
  }
  
  export interface IStep{
    id: string;
    object: string;
    created_at: number;
    run_id: string;
    assistant_id: string;
    thread_id: string;
    type: string;
    status: string;
    cancelled_at: number;
    completed_at: number;
    expires_at: number;
    failed_at: number;
    last_error: string;
    step_details: {
      type: string;
      message_creation: {
        message_id: string;
      };
    };
  }

  export interface IOpenaiItem{
    type:'message'|'run'|'extra';
    data:IMessage|IRun|any;
  }

  export interface IParagraph {
    content: string;
    type: string;
  }
  //"256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" ='512x512';
  export enum DallESize {
    $256x256 = "256x256",
    $512x512 = "512x512",
    $1024x1024 = "1024x1024",
    $1792x1024 = "1792x1024",
    $1024x1792 = "1024x1792",
  }