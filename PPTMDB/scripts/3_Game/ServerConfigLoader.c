class ServerConfigLoader {
    static void LoadServerAPIIP(out string serverAPI_IP, out string server_number)
    {
        string filePath = "$profile:\\PPTMDB\\serverAPI_IP.json";
        map<string, string> parsedData;
        string errorMessage;

        JsonFileLoader<map<string, string>>.LoadFile(filePath, parsedData, errorMessage);
        
        if (parsedData.Contains("serverAPI_IP"))
        {
            serverAPI_IP = parsedData.Get("serverAPI_IP");
            server_number = parsedData.Get("server_number");
        }
    }
}