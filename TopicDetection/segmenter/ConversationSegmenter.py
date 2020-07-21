# from Window import Window
from model.SimilarTopicCalculator import SimilarTopicCalculator
from model.ReplyObjectPredictor import ReplyObjectPredictor
from text.Topic import Topic

class Window:
    def __init__(self, window_size):
        self.topics = []
        self.windowSize = window_size

    def addTopic(self, topic):
        if topic in self.topics:
            index = self.topics.index(topic)
            self.topics[index], self.topics[-1] = self.topics[-1], self.topics[index]
        else:
            self.topics.append(topic)
            if len(self.topics) == self.windowSize + 1:
                self.topics = self.topics[1:]

    def getTopics(self):
        return self.topics

class ConversationSegmenter:
    def __init__(self, messages, windowSize, cosineSimilarityThreshold, tokenizer):
        self.messages = messages
        self.window = Window(windowSize)
        self.similarTopicCalculator = SimilarTopicCalculator(
            self.window, messages, tokenizer)
        self.replyObjectPredictor = ReplyObjectPredictor(
            self.window, cosineSimilarityThreshold, self.similarTopicCalculator, tokenizer)

    def segment(self):
        topics = [None for i in self.messages]
        topicSet = []
        for i, message in enumerate(self.messages):
            # print("Processing message id: " + str(message.getID()))
            if i > 0 and self.messages[i - 1].getAuthor() == message.getAuthor():
                topics[i] = topics[i - 1]
                topics[i].appendMessage(message, 'same author')
            else:
                (replied_topic, reason) = self.replyObjectPredictor.predict(message)
                if replied_topic is None:
                    topic = Topic(message, reason)
                    topicSet.append(topic)
                else:
                    topic = replied_topic
                    topic.appendMessage(message, reason)
                self.window.addTopic(topic)
                topics[i] = topic

        # eliminate mistopics
        i = 0
        while i < len(topicSet):
            if topicSet[i].size() > 2 or i == 0:
                pass
            otherMessages = topicSet[i - 1].getMessages()
            messages = topicSet[i].getMessages()
            if messages[0].getID() > otherMessages[0].getID() and messages[-1].getID() < otherMessages[-1].getID():
                topicSet[i - 1].absorve(topicSet[i])
                topicSet.remove(topicSet[i])
            else:
                i = i + 1
        return topicSet
