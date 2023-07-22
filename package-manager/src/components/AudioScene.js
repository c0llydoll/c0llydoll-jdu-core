module.exports = (mapName = String) => {
    return `
    <?xml version="1.0" encoding="ISO-8859-1"?>
<root>
	<Scene ENGINE_VERSION="259681" GRIDUNIT="0.500000" DEPTH_SEPARATOR="0" NEAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" FAR_SEPARATOR="1.000000 0.000000 0.000000 0.000000, 0.000000 1.000000 0.000000 0.000000, 0.000000 0.000000 1.000000 0.000000, 0.000000 0.000000 0.000000 1.000000" viewFamily="0">
		<ACTORS NAME="Actor">
			<Actor RELATIVEZ="0.000000" SCALE="1.000000 1.000000" xFLIPPED="0" USERFRIENDLY="MusicTrack" MARKER="" POS2D="1.125962 -0.418641" ANGLE="0.000000" INSTANCEDATAFILE="" LUA="world/maps/${mapName.toLowerCase()}/audio/${mapName.toLowerCase()}_musictrack.tpl">
				<COMPONENTS NAME="MusicTrackComponent">
					<MusicTrackComponent />
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