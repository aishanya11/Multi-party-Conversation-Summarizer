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
        files = glob.glob('../../Topic-Detection/Topics/*.txt')
        # files = glob.glob('../Topic-Detection/Topics/*.txt')
        for f in files:
            os.remove(f)
        idGroups = []
        rr=0
        for topic in topics:
            rr+=1
            idGroup = []
            for (message, reason) in zip(topic.getMessages(), topic.getReasons()):
                idGroup.append(message.getID())
            idGroups.append(idGroup)

        for ind, topic in enumerate(topics):
            # When running from the server
            arg1 = "../../Topic-Detection/Topics/topic-" + str(ind) + ".txt"
            # When running from terminal
            # arg1 = "../Topic-Detection/Topics/topic-" + str(ind) + ".txt"
            file = open(arg1,"w")
            for message in topic.getMessages():
                file.write(message.getText())
            file.close()
        print(rr)


def main(json_input):
    TestRunner(json_input).run()

if __name__ == '__main__':
    main(sys.argv[1])
