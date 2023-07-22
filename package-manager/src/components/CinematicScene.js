module.exports = (mapName = String) => {
    return `
    <?xml version="1.0" encoding="ISO-8859-1"?>
    <root>
        <Scene ENGINE_VERSION="272792" GRIDUNIT="0.500000" DEPTH_SEPARATOR="0" NEAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" FAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" viewFamily="0">
            <ACTORS NAME="Actor">
                <Actor RELATIVEZ="0.000000" SCALE="1.000000 1.000000" xFLIPPED="0" USERFRIENDLY="${mapName.toLowerCase()}_MainSequence" MARKER="" isEnabled="1" POS2D="0.000000 0.000000" ANGLE="0.000000" INSTANCEDATAFILE="" LUA="world/maps/${mapName.toLowerCase()}/cinematics/${mapName.toLowerCase()}_mainsequence.tpl">
                    <COMPONENTS NAME="MasterTape">
                        <MasterTape/>
                    </COMPONENTS>
                </Actor>
            </ACTORS>
            <sceneConfigs>
                <SceneConfigs activeSceneConfig="0"/>
            </sceneConfigs>
        </Scene>
    </root>
`
};