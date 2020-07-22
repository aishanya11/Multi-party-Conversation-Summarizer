import json
import sys

def main(input_file):
  txt_file = "/Users/riyak/STUDY/BTP-2/git/Multi-party-Conversation-Summarizer/Website-Code/FRONT END/uploads/" + input_file 
  output_json = "/Users/riyak/STUDY/BTP-2/git/Multi-party-Conversation-Summarizer/Website-Code/chatsToJson/chats2.json"
  f = open(txt_file,"r+")
  chats = f.readlines()[1:]
  # print(chats[0])
  timestamps = [s[:19] for s in chats]
  # print(timestamps[0])
  users_msgs = [str(s[22:]) for s in chats] 

  indices = [s.find(":") for s in users_msgs] 
  users = []
  msgs = []
  for i in range(len(users_msgs)):
      users.append(users_msgs[i][0:indices[i]])
      msgs.append(users_msgs[i][indices[i]+2:])
  # print(users[0])
  # print(msgs[0])
  jsonn = {"anon_text":{}, "user":{}, "ts":{}, "type":{}}
  for i in range(1,len(msgs)+1):
      jsonn["anon_text"][str(i)] = msgs[i-1]
      jsonn["user"][str(i)] = users[i-1]
      jsonn["ts"][str(i)] = timestamps[i-1]
      jsonn["type"][str(i)] = "message"  
  with open(output_json, 'w') as json_file:
    json.dump(jsonn, json_file)
  print("done")

if __name__ == '__main__': 
    main(sys.argv[1])