class MongoDBConnector
{
    private ref ServerConfigLoader serverconfigLoader;

    static void SendPlaytimeToMongoDB(string playerId, string playerName, float playtime, string url, string servernumb)
    {
        string jsonData = string.Format("{\"playerId\": \"%1\", \"playerName\": \"%2\", \"playtime\": %3,\"servernumb\": \"%4\"}", 
                                         playerId, playerName, playtime, servernumb);
        string apiurl = "http://"+url+"/api/playtime";
        RestApi restApi = CreateRestApi();
        Print("[apiurl] "+apiurl);
        if (restApi)
        {
            RestContext context = restApi.GetRestContext(apiurl);
            if (context)
            {
                context.SetHeader("application/json");
                context.POST(new MongoDBCallback(), "", jsonData);
            }
        }
    }
}

class MongoDBCallback : RestCallback
{
    override void OnSuccess(string data, int dataSize)
    {
        Print("[MongoDBCallback] Data successfully sent: " + data);
    }

    override void OnError(int errorCode)
    {
        Print("[MongoDBCallback] Error sending data, code: " + errorCode);
    }
}