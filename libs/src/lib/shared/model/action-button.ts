export interface ActionButton {
    id: string;
    label: string;
    icon?: string;
    image?: string;
    title: string;
    textColor?: string;
    class?: string;
    loading_message?: string;
    confirm_message?: string;
    confirm_first?: boolean;
    action: string; // unique action that will be emmited to you
  }

export interface Column{
  accessorKey?: string, //simple recommended way to define a column
  header: string,
  enableHiding: false,
  accessorFn?:any,
  id?:string,
}
  