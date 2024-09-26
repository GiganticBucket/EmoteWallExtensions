GB_Lean_Setup();
function GB_Lean_Setup() {
    registerPlugin({
        name: "LeanExtension",
        ModifyEmoteDataList: (message, emoteDataListBuilder) => {
            if (message.isBroadcaster || message.username.toLowerCase() == "thenintendad_64") {
                if (emoteDataListBuilder.valuesSnapshot.some(e => e.name === "thenin52Lean")) {
                    emoteDataListBuilder.removeAllWithName("thenin52Lean");
                    startLean();
                }
            }
        },
        testButtons: [
            {
                buttonText: "Lean",
                callback: () => startLean()
            }
        ]
    });
    function startLean() {
        const leanEmoteData = new EmoteData("macrop3PB", "https://static-cdn.jtvnw.net/emoticons/v2/306937756/default/light/3.0", EmoteOriginKind.Twitch);
        const overlayEmote = new OverlayEmote(leanEmoteData, new OverlayEmoteState(5), new EmoteConfigurerList(new LeanConfigurer()), new EmoteBehaviorList(new LeanBehavior()));
        ActiveEmotesManager.startOverlayEmotes([overlayEmote]);
    }
    class LeanConfigurer {
        constructor() {
            this._dimension = 200;
        }
        configure(startingOverlayEmote) {
            startingOverlayEmote.state.image.style.top = `${window.innerHeight - this._dimension}px`;
            startingOverlayEmote.state.image.style.left = `${window.innerWidth + this._dimension}px`;
            startingOverlayEmote.state.image.width = this._dimension;
            startingOverlayEmote.state.image.height = this._dimension;
        }
    }
    class LeanBehavior {
        constructor() {
            this._dimension = 200;
        }
        apply(overlayEmoteState) {
            const percentOfWaveElapsed = overlayEmoteState.elapsedSeconds / 5;
            if (percentOfWaveElapsed > 1) {
                overlayEmoteState.duration = 0;
            }
            let percentOfLeanIn = Math.sin(percentOfWaveElapsed * Math.PI);
            let travelDistanceRange = this._dimension;
            let travelDistanceNow = percentOfLeanIn * travelDistanceRange;
            let leftPixelsFromRight = travelDistanceNow;
            overlayEmoteState.image.style.left = `${window.innerWidth - leftPixelsFromRight}px`;
        }
    }
}
//# sourceMappingURL=Lean.js.map