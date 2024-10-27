const extensionName = "st-no-thumbs-extension"

jQuery(async function() {
    const chatNode = document.getElementById("chat");

    const chatObserver = new MutationObserver(function() {
        const avatarImages = chatNode.querySelectorAll("div.mes[is_user=false] div.avatar>img[src*=\"file=\"]");

        for (const avatarImage of avatarImages) {
            const internalCharName = avatarImage.src.match(/file=.*?\.png/)[0].slice("file=".length);
            avatarImage.src = `/characters/${internalCharName}`;
        }
    });

    chatObserver.observe(chatNode, { childList: true });

    const zoomedAvatarObserver = new MutationObserver(function() {
        const zoomedAvatar = document.querySelector("img.zoomed_avatar_img[src$=\".png\"][src*=\"characters/\"]");

        if (zoomedAvatar !== null) {
            zoomedAvatar.src = `/characters/${(x => x[x.length - 1])(zoomedAvatar.src.split("/"))}`;
        }
    });

    zoomedAvatarObserver.observe(document.body, { childList: true, attributes: true });
});
