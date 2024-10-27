const extensionName = "st-no-thumbs-extension"

jQuery(async function() {
    const chatNode = document.getElementById("chat");

    const chatObserver = new MutationObserver(function() {
        const messages = chatNode.querySelectorAll("div.mes[is_user=false]");

        for (const message of messages) {
            const avatarImage = message.querySelector("div.avatar>img");
            const internalCharName = avatarImage.src.match(/file=.*?\.png/)[0].slice("file=".length);
            avatarImage.src = `/characters/${internalCharName}`;
        }
    });

    chatObserver.observe(chatNode, { childList: true });

    const zoomedAvatarObserver = new MutationObserver(function() {
        const zoomedAvatarNode = document.querySelector("img.zoomed_avatar_img[src$=\".png\"]");

        if (zoomedAvatarNode !== null) {
            zoomedAvatarNode.src = `/characters/${(x => x[x.length - 1])(zoomedAvatarNode.src.split("/"))}`;
        }
    });

    zoomedAvatarObserver.observe(document.body, { childList: true, attributes: true });
});
