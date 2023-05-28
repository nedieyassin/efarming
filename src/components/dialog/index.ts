import {openDialog} from 'vue3-promise-dialog';
import AddDialog from "./AddDialog.vue";
import AddChatDialog from "./AddChatDialog.vue";
import AlertDialog from "./AlertDialog.vue";


export const addDialog = (args: Record<any, any>) => openDialog(AddDialog as any, {...args});
export const addChatDialog = (args: Record<any, any>) => openDialog(AddChatDialog as any, {...args});
export const alertDialog = (args: Record<any, any>) => openDialog(AlertDialog as any, {...args});
