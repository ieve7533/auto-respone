const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client();

var PREFIX = "."


const array = []


client.on('ready',() => {console.log(`Bot Ready As: <${client.user.tag}>`)})


client.on('message',async(message) => {
    let data = JSON.parse(fs.readFileSync("./respons.json"));
    if(message.author.bot) return
    let guild = message.guild

    if(!data[guild.id]) data[guild.id] = {}

    if(!data[guild.id].word) data[guild.id] = {
        word: array
        };
    
     if(!data[guild.id].respone) data[guild.id] = {
            word: data[guild.id].word,
            respone: array
            };
    
    
            fs.writeFileSync("./respons.json", JSON.stringify(data, null, 4));
            data = JSON.parse(fs.readFileSync("./respons.json"));


let args = message.content.toLowerCase().trim().split(/ +/)
let command = args.shift().slice(PREFIX.length)

if(data[guild.id].word.includes(message.content) || data[guild.id].word.includes(args.shift())) {

let rword =  data[guild.id].word.find(w => w.includes(message.content))
if(!rword) rword =  data[guild.id].word.find(w => w.includes(args.shift()))

let num = data[guild.id].word.indexOf(rword)
let rrespone = data[guild.id].respone[num]

message.reply(rrespone)


}




if(!message.content.startsWith(PREFIX)) return

if(command == "add"){

var tword = ``;
var trespone = ``;

let embed1 = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("ألأن من فضلك ادخل الكلمة او الجملة التي سيتم الرد عليها ")
                    .setDescription("مثلا: السلام عليكم");

                    let embed2 = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("ألأن من فضلك ادخل الكلمة او الجملة التي سيتم الرد بها ")
                    .setDescription("مثلا: وعليكم السلام");



                    const filter = m => {
                        return m.author.id === message.author.id && m.channel.id === message.channel.id
                    };




message.reply(embed1).then(m1 => {
    message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    .then(collected1 => {

        m1.delete({timeout: 1})

        message.reply(embed2).then(m2 => {

            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(collected2 => {
                m2.delete({timeout: 1})
                data[guild.id].word.push(collected1.first().content)
                data[guild.id].respone.push(collected2.first().content)
        
                fs.writeFileSync("./respons.json", JSON.stringify(data, null, 4))
                
                let embed3 = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("تم اضافة الرد")
                                    .addField("الكلمة",collected1.first().content)
                                    .addField("الرد",collected2.first().content)

                message.reply(embed3)
        
            })
            .catch(collected2 => {
                message.channel.send('لم يتم الحصول على مدخلات');
            });




        })
        






    })
    .catch(collected1 => {
        message.channel.send('لم يتم الحصول على مدخلات');
    });


})




}





})



client.login('NzMyMjcxMzgwNTI3MzE3MDUz.XwyK3g.XCUU6w1fF6N-FqUtRDchEvBDo2Y')