export interface sprintNameTitleInterface {
      title: string;
    }

export interface sprintNameInterface {
      id: string;
      title: sprintNameTitleInterface;
}

export interface sprintInterface {
    tasks: string[];
    _id: string;
    id?: string;
    title: string;
    startDate: string;
    endDate: string;
    duration: number;
    projectId: string;
    __v: number;
}
    
