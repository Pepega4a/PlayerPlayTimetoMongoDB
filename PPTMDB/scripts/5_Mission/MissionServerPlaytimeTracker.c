modded class MissionServer
{
    private ref PlaytimeTracker playtimeTracker;

    override void OnInit()
    {
        super.OnInit();
        playtimeTracker = new PlaytimeTracker();
        
        Print("[PlaytimeTracker] Initialized.");

    }

    override void InvokeOnConnect(PlayerBase player, PlayerIdentity identity)
    {
        if (player)
        {
            string playerId = identity.GetPlainId();
            string playerName = identity.GetName();
            playtimeTracker.StartTracking(playerId, playerName);
        }
    }

    override void InvokeOnDisconnect(PlayerBase player)
    {
        if (player)
        {
            string playerId = player.GetIdentity().GetPlainId(); //
            playtimeTracker.StopTracking(playerId);
        }
    }

    override void OnUpdate(float timeslice)
    {
        super.OnUpdate(timeslice); //

        if (playtimeTracker)
        {
            playtimeTracker.UpdateAll(timeslice);
        }
    }
}