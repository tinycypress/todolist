// COMMANDS ??
import { SlashCommandBuilder } from "@discordjs/builders";
import COOP, { USERS, CHANNELS } from '../../origin/coop.mjs';
import { EMOJIS } from '../../origin/config.mjs';


//CREATING A NEW TODO LIST
export const name = 'todo';
export const description = 'Organize your daily goals with The Coop!';
//export const examples = '/todo <item1>, <item2>, ..., <itemn>'; ??

export const data = new SlashCommandBuilder()
	
    .setName(name)
	.setDescription(description)
        
        //creating a new to-do list
        .addSubcommand(subcommand =>
		subcommand
			.setName('create_list')
			.setDescription('Create a new to-do list.')
			.addStringOption(option => 
				option
					.setName('items')
					.setDescription('Separate list items with \',\'!')
					.setRequired(true))

        //adding a new item
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add items to an existing list.'))

        //if user needs to add one or more items, they can be added on to the previous list

        //marking item as done
        .addSubcommand(subcommand =>
            subcommand
                .setName('mark_done')
                .setDescription('Cross off items by separating completed task numbers with a \',\'.'));         
    
export const execute = async interaction => {
        const action = interaction.options.getSubcommand();
        if (action === 'items') return await createList(interaction);
        if (action === 'add') return await addItem(interaction);
        if (action === 'mark_done') return await markDone(interaction);
}

//CREATING NEW LIST
const createList = async interaction => {

    // Access the string of items on the list
	const allItems = interaction.options.get('items').value ?? '';
    // Create array where every list item is separated by the comma
    var todoArray = allItems.split(","); 
    var i = 0;
    var j = i + 1;
    // Get string version of j so we can add it to list format
    var itemNumber = console.log(j.toString()); 

    // Send title of @user's list first
    interaction.reply('**' + `<@${interaction.user.id}>` + '\'s To-Do List for today!' + '**' + '\n\n');
    
    // Iterate creating new lines for every item on array
    do {
        interaction.reply( itemNumber + '. :blue_circle: ' + todoArray[i] +'\n');
        i = i++;
        j = j++;
    } while (i < todoArray.length);
}

//ADDING TO EXISTING LIST
const addItem = async interaction => {

    //check if there is a previous list of same date; idk how yet but we'll see. concept:
    const prevList = await data.getList(interaction.user.id);
    if (!prevList){
            	COOP.MESSAGES.selfDestruct(interaction.channel, `${interaction.user.username}, you don't have an ongoing list for today.`);
    }
    else
    //edit previous list-message. (grab nums by counting from index of '.' to start.). convert string to int. new int = stingtoint+1. do while, add as many new items from stringtoint+1 on forwards.
	const stringofAdditions = interaction.options.get('add').value ?? '';
    var addArray = stringofAdditions.split(",");
    //rest of code here lul
    }
    
 
//CROSSING OFF ITEMS
const markDone = async interaction => {
    //split string to form an array of crossed off items by the commas 
    const crossString = interaction.options.get('mark_done').value ?? '';
    var crossArray = crossString.split(","); 
    var i = 0;

    //example mark_done string = '1, 23, 45'
    //example crossArray = [1, 23, 45]
    //item 0 of crossArray = 1;
    //oldString = item 0 of crossArray + '. :blue_circle';
    //newString = item 0 of crossArray + '. :radio_button';
    //for every oldString instance in the whole list replace with newstring;
    //i++;
    //do while (i < crossArray.length); 
}
