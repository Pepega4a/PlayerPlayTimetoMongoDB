class CfgPatches
{
    class Pepega
    {
        units[] = {};
        weapons[] = {};
        requiredVersion = 0.1;
        requiredAddons[] = {};
    };
};
class CfgMods
{
    class Pepega_mod
    {
        dir = "PPTMDB";
        name = "PPTMDB";
        type = "mod";
        dependencies[] = {"World","Mission","Game"};
        class defs
        {
            class missionScriptModule
            {
                value = "";
                files[] = 
                {
                    "PPTMDB/scripts/5_Mission"
                };
            };
            class worldScriptModule
            {
                value = "";
                files[] = 
                {
                    "PPTMDB/scripts/4_World"
                };
            };
            class gameScriptModule
            {
                value = "";
                files[] = 
                {
                    "PPTMDB/scripts/3_Game"
                };
            };
        };
    };
};