class PlaytimeTracker
{
    private ref map<string, ref PlayerPlaytimeData> playersData;
    private ref ServerConfigLoader serverconfigLoader;

    void PlaytimeTracker()
    {
        playersData = new map<string, ref PlayerPlaytimeData>();
    }

    void StartTracking(string playerId, string playerName)
    {
        if (!playersData.Contains(playerId))
        {
            playersData.Insert(playerId, new PlayerPlaytimeData(playerId, playerName));
        }
    }

    void StopTracking(string playerId)
    {
        if (playersData.Contains(playerId))
        {
            string ulr;
            string servernumb;
            PlayerPlaytimeData data = playersData.Get(playerId);
            serverconfigLoader.LoadServerAPIIP(ulr, servernumb);
            MongoDBConnector.SendPlaytimeToMongoDB(data.playerId, data.playerName, data.totalPlaytime, ulr, servernumb);
            playersData.Remove(playerId);
        }
    }

    void UpdateAll(float timeslice)
    {
        foreach (string playerId, PlayerPlaytimeData data : playersData)
        {
            data.AddPlaytime(timeslice);
        }
    }
}

class PlayerPlaytimeData
{
    string playerId;
    string playerName;
    float totalPlaytime;

    void PlayerPlaytimeData(string id, string name)
    {
        playerId = id;
        playerName = name;
        totalPlaytime = 0;
    }

    void AddPlaytime(float timeslice)
    {
        totalPlaytime += timeslice;
    }
}