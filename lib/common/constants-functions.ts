import constants from "./constants";

export default {
    PATH_BY_ASSET_TYPE: (assetType: string) => {
        switch (assetType?.split('/')?.[0]) {
            default: return constants.OTHER_ASSET;
        }
    },
}