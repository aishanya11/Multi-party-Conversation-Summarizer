import json
txt_file = "/Users/aishanyasingh/Desktop/BTP2/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/uploads/sample.txt" 
output_json = "./chats.json"
f = open(txt_file,"r+")
chats = f.readlines()[1:]
print(chats[0])
timestamps = [s[:19] for s in chats]
print(timestamps[0])
users_msgs = [str(s[22:]) for s in chats] 

indices = [s.find(":") for s in users_msgs] 
users = []
msgs = []
for i in range(len(users_msgs)):
    users.append(users_msgs[i][0:indices[i]])
    msgs.append(users_msgs[i][indices[i]+2:])
print(users[0])
print(msgs[0])
jsonn = {"anon_text":{}, "user":{}, "ts":{}, "type":{}}
for i in range(1,len(msgs)+1):
    jsonn["anon_text"][str(i)] = msgs[i-1]
    jsonn["user"][str(i)] = users[i-1]
    jsonn["ts"][str(i)] = timestamps[i-1]
    jsonn["type"][str(i)] = "message"  
with open('chats.json', 'w') as json_file:
  json.dump(jsonn, json_file)
