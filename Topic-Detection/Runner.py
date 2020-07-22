import sys
import os
import glob
from text.Message import Message
from grammar.MessageTokenizer import MessageTokenizer
from segmenter.ConversationSegmenter import ConversationSegmenter
from text.JSONParser import JSONParser

class TestRunner:
    def __init__(self, json_file_name):
        self.jsonFileName = json_file_name

    def run(self):
        parser = JSONParser(self.jsonFileName)
        self.messages = parser.getMessages()
        self.tokenizer = MessageTokenizer()
        windowSize = 3
        cosineSimilarityThreshold = 0.9
        segmenter = ConversationSegmenter(
            self.messages, windowSize, cosineSimilarityThreshold, self.tokenizer)
        topics = segmenter.segment()
        self.report(topics)
        

    def report(self, topics):
        files = glob.glob('/Users/riyak/STUDY/BTP-2/git/Multi-party-Conversation-Summarizer/Topic-Detection/Topics/*.txt')
        for f in files:
            os.remove(f)
        idGroups = []
        # print("============================= detailed ==========================")
        rr=0
        for topic in topics:
            rr+=1
            # print("== Topic ==")
            idGroup = []
            for (message, reason) in zip(topic.getMessages(), topic.getReasons()):
                idGroup.append(message.getID())
            #     print("\n\t------ id: \t" , str(message.getID()) , "\t" + reason)
            #     print("" , message.getText().encode('utf-8'))
            # print("\n")
            idGroups.append(idGroup)

        # print("=================================================================")

        # print("============================= short =============================")
        for ind, topic in enumerate(topics):
            # print("== Topic ==")
            arg1 = "/Users/riyak/STUDY/BTP-2/git/Multi-party-Conversation-Summarizer/Topic-Detection/Topics/topic-" + str(ind) + ".txt"
            file = open(arg1,"w")
            for message in topic.getMessages():
                # print(str(message.getID()) , ":\t" , message.getText().encode('utf-8'))
                file.write(message.getText())
            # print("\n")
            file.close()
        print(rr)
        # print(len(idGroups))
        #print(idGroups)


def main(json_input):
    TestRunner(json_input).run()

if __name__ == '__main__':
    main(sys.argv[1])
