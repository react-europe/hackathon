from flask import Flask
import flask
from reddit import Submissions
from reddit import Submission
import redis
import json

try:
    from flask.ext.cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask.ext.cors import CORS

r = redis.StrictRedis(host='localhost', port=6379, db=0)

app = Flask(__name__)
cors = CORS(app)
@app.route("/")

def hello():
    if r.get('worldnews') is None :
        submissions = Submissions();
        submissions.getFromReddit('worldnews',10)
        urlsInTweets = submissions.getFromTwitter()

        r.set('worldnews', json.dumps(urlsInTweets))
        return flask.jsonify(result=urlsInTweets)
    else :
        urlsInTweets = r.get('worldnews')
        submissions = json.loads(urlsInTweets)
        return flask.jsonify(result=submissions)
        # submissionsInfo = {'result' : result}
        # return flask.jsonify(result=submissionsInfo)
    
    #submissions = Submissions().getFromReddit('worldnews',10)
    #a = submissions.getFromTwitter()
    
    #submission.getTweetLinksFromHashtags()

if __name__ == "__main__":
    app.debug = True
    app.run(threaded=True)