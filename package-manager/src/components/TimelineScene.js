module.exports = (mapName = String) => {
    return `
    <?xml version="1.0" encoding="ISO-8859-1"?>
<root>
	<Scene ENGINE_VERSION="273471" GRIDUNIT="0.500000" DEPTH_SEPARATOR="0" NEAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" FAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" viewFamily="0">
		<ACTORS NAME="Actor">
			<Actor RELATIVEZ="0.000001" SCALE="1.000000 1.000000" xFLIPPED="0" USERFRIENDLY="${mapName.toLowerCase()}_tml_dance" MARKER="" isEnabled="1" POS2D="-1.157740 0.006158" ANGLE="0.000000" INSTANCEDATAFILE="" LUA="world/maps/${mapName.toLowerCase()}/timeline/${mapName.toLowerCase()}_tml_dance.tpl">
				<COMPONENTS NAME="TapeCase_Component">
					<TapeCase_Component />
				</COMPONENTS>
			</Actor>
		</ACTORS>
		<ACTORS NAME="Actor">
			<Actor RELATIVEZ="0.000001" SCALE="1.000000 1.000000" xFLIPPED="0" USERFRIENDLY="${mapName.toLowerCase()}_tml_karaoke" MARKER="" isEnabled="1" POS2D="-1.157740 0.006158" ANGLE="0.000000" INSTANCEDATAFILE="" LUA="world/maps/${mapName.toLowerCase()}/timeline/${mapName.toLowerCase()}_tml_karaoke.tpl">
				<COMPONENTS NAME="TapeCase_Component">
					<TapeCase_Component />
				</COMPONENTS>
			</Actor>
		</ACTORS>
		<sceneConfigs>
			<SceneConfigs activeSceneConfig="0" />
		</sceneConfigs>
	</Scene>
</root>

`
};