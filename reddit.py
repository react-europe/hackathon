import praw
import json
import tweepy
import nltk
import re
import unicodedata
from collections import Counter
from TwitterSearch import *




# consumerKey = "abcxlLAasaG6HeFfay0EWqMB9"
# consumerSecret = "tgbBqKegyCb2gj5f4oPhAsCz7mfzmPejzDcgVIGHeKp8hSndWf"
# accessToken = "984449647-2u5RQKEsptAKI4aDzyYjwFqBsG1JXdWx6TnIbCOW"
# accessSecret = "v3Z0mwJ2JGSjIIav9uy6m6PD8TBUU9zheml3kmvIgQjgw"

consumerKey = "Up4TEdBjNLbYX9FTVNvHmLWTl"
consumerSecret = "L5B5M0ZrCFsQoRLzAoCE2H4xc7miVcddT7Z3fsJN726Fz5NuMT"
accessToken = "984449647-Z84gfx0YPshxVGW3IVEBx1atsvaKHZpXWRwSTgPI"
accessSecret = "6iAefPifIlWNQPZgmLJ2eTdVUuJKUhlrYnUqQdfLBQKtR"

auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessSecret)

api = tweepy.API(auth)



ts = TwitterSearch (
consumer_key = consumerKey,
consumer_secret = consumerSecret,
access_token = accessToken,
access_token_secret = accessSecret
)

def search(keywords):
    try:
        tso = TwitterSearchOrder() # create a TwitterSearchOrder object
        tso.set_keywords(['#spanish', '#language','#usa']) # let's define all words we would like to have a look for
        tso.set_result_type('recent')
        tso.set_link_filter()
        #tso.set_language('en') # we want to see English tweets only
        tso.set_include_entities(True) # and don't give us all those entity information

         # this is where the fun actually starts :)
        for tweet in ts.search_tweets_iterable(tso):
            print( '@%s tweeted: %s' % ( tweet['user']['screen_name'], tweet['text'] ) )

    except TwitterSearchException as e: # take care of all those ugly errors if there are some
        print(e)
        return


def extractKeywords(text):

        keyWords = [];
        text = re.sub(r'^https?:\/\/.*[\r\n]*', '', text, flags=re.MULTILINE)
        text = re.sub(r'^@', '', text, flags=re.MULTILINE)
        string =unicodedata.normalize('NFKD', text).encode('ascii','ignore')
        string = string.lower()
    
        tokenizedString = nltk.word_tokenize(string)
        taggedWords = nltk.pos_tag(tokenizedString)
        
        for word in taggedWords:
            if word[1] == 'VBP':
                    keyWords.append(word[0])
            elif word[1] == 'NNP':
                    keyWords.append(word[0])

        return keyWords;

def extractTokenizedText(text):
    #string =unicodedata.normalize('NFKD', text).encode('ascii','ignore')
    text = text.lower()

    tokenizedString = nltk.word_tokenize(text)
    return tokenizedString;
    #wordFrequencyDist = nltk.FreqDist(tokenizedString)

def extractText(tweet):
        text = re.sub(r'http?:\/\/.*[\r\n]*', '', tweet, flags=re.MULTILINE)
        text = re.sub(r'@([A-Za-z0-9_]{1,15})', '', text, flags=re.MULTILINE)
        string =unicodedata.normalize('NFKD', text).encode('ascii','ignore')
        string = string.lower()
        return string

def extractUrls(tweet, urls) :
    
    for url in tweet.entities['urls']:
        urls.append(url['expanded_url'])

    return urls

def extractHashtags(tweet, hashtags) :
    #for url in tweet.entities['urls']:
        #print url['expanded_url']

    for hashtag in tweet.entities['hashtags']:
        hashtags.append(hashtag['text'].lower())

    return;

def getWordFrequencyDist(text, mostCommonCount):

    tokenizedText = extractTokenizedText(text)
    wordFrequencyDist = nltk.FreqDist(tokenizedText)
    return wordFrequencyDist.most_common(mostCommonCount)


def getFromReddit(subreddit, limit):
    user_agent = "News Aggregator 0.1 by /u/tgoc"
    r = praw.Reddit(user_agent=user_agent)
    submissionsFromReddit = r.get_subreddit('worldnews').get_hot(limit=10)
    submissions = []
    for submission in submissionsFromReddit:
        submissions.append(Submission(submission))

    return submissions

class Submission :


    def __init__ (self, submission):
        self.permalink =  submission.permalink
        self.short_link =  submission.short_link
        self.title=   submission.title
        self.url =   submission.url
        self.num_comments =  submission.num_comments
        self.ups=  submission.ups
        self.downs = submission.downs
        self.is_self = submission.is_self
        self.hashtags = []
        self.sortedHashtags = []
        self.linkTweets = []
        self.tweetsText = ""
        self.popularHashtags= []
        self.urlsFromHashtags = {}
        self.uniqueUrls = []


    def extractUrls(self, tweet) :
        urlHashtag = {
            'urls' :[],
            'hashtags': []
        };
        urls = []
        for url in tweet.entities['urls']:
            urls.append(url['expanded_url'])
            #self.urlsFromHashtags.append(url['expanded_url'])

        return urls;

    def getTweetsFromLink(self):
        self.linkTweets = api.search(self.url, count = 100, show_user=True)
        print "Received "+str(len(self.linkTweets))+" tweets"
        self.parseTweets()
        return self.linkTweets

    def extractHashtags(self, tweet):
        for hashtag in tweet.entities['hashtags']:
            self.hashtags.append(hashtag['text'].lower())
        return
    
    def cleanText(self, text):
        text = re.sub(r'http?:\/\/.*[\r\n]*', '', text, flags=re.MULTILINE)
        text = re.sub(r'@([A-Za-z0-9_]{1,15})', '', text, flags=re.MULTILINE)
        string =unicodedata.normalize('NFKD', text).encode('ascii','ignore')
        string = string.lower()
        return string

    def parseTweets(self):
        for tweet in self.linkTweets:
            self.extractHashtags(tweet)
            self.tweetsText += '  ' + self.cleanText(tweet.text)
        hashtagTuples = Counter(self.hashtags).most_common(3)
        for hashtag in hashtagTuples:
            self.popularHashtags.append(hashtag[0])
        print self.popularHashtags


    def getTweetLinksFromHashtags(self):
            
            if (len(self.popularHashtags) == 0):
                return []

            tweetSearchQuery = "#" + "   #".join(self.popularHashtags);
            tweetSearchQuery += " filter:links"
            #tweetSearchQuery = " ".join(self.popularHashtags);
            
            self.hashtagTweets = api.search(tweetSearchQuery, count=100, result_type='mixed');
            
            urls = []
            for tweet in self.hashtagTweets:
                self.extractUrls(tweet)
                urls += self.extractUrls(tweet)
            
            uniqueUrlsDist = Counter(urls).most_common(10)
            uniqueUrls = []
            
            for url in uniqueUrlsDist:
                print url[0]
                uniqueUrls.append(url[0])
            setattr(self, 'uniqueUrls','asdasdasd')
            #self.uniqueUrls =uniqueUrls
            
            return uniqueUrls
            
    def toJSON(self):
            return {
                'permalink': self.permalink,
                'short_link': self.short_link,
                'title': self.title,
                'url': self.url,
                'num_comments': self.num_comments,
                'ups': self.ups,
                'downs': self.downs,
                'is_self': self.is_self,
                'hashtags': self.hashtags,
                'sortedHashtags': self.sortedHashtags,
                #'linkTweets': self.linkTweets,
                #'tweetsText': self.tweetsText,
                'popularHashtags': self.popularHashtags,
                'uniqueUrls': self.uniqueUrls,
                'urlsFromHashtags': self.urlsFromHashtags
                
            }

class Submissions :
    def __init__(self):
        
        self.submissions = []

    def getFromReddit(self, subreddit, count):
        user_agent = "News Aggregator 0.1 by /u/tgoc"
        r = praw.Reddit(user_agent=user_agent)
        submissionsFromReddit = r.get_subreddit('worldnews').get_hot(limit=10)
        for submission in submissionsFromReddit:
            self.submissions.append(Submission(submission))
        return self.submissions

    def getFromTwitter(self):
        for submission in self.submissions:
            #submission = Submission(s)
            if (submission.is_self is True):
                continue
            submission.getTweetsFromLink()
            uniqueLinks = submission.getTweetLinksFromHashtags()
            submission.uniqueUrls = uniqueLinks
            print "TO JSON :"
            print submission.toJSON();

        #print "RESULT : "
        #print list(json.dumps(self.toDists()))
        jsonSubmissions = self.toDists();
        return jsonSubmissions

    def toDists(self):
        submissions = []
        for s in self.submissions:
            submissions.append(s.toJSON())
        return submissions

# submissions = Submissions();
# submissions.getFromReddit('worldnews',10)
# urlsInTweets = submissions.getFromTwitter()


#submissions.getFromReddit('worldnews',10)
#urlsInTweets = submissions.getFromTwitter();
#print urlsInTweets;

# for s in submissions :
#     submission =  Submission(s)
#     print "TITLE : "+submission.title
#     if (submission.is_self is True):
#         continue
#     submission.getTweetsFromLink()
#     submission.getTweetLinksFromHashtags()

