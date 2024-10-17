import {getServers} from "./icesettings.js";
import signalingServerIP from "./signaling_server.js";

export async function getServerConfig() {
  const protocolEndPoint = 'https://' + signalingServerIP + '/config';
  const createResponse = await fetch(protocolEndPoint);
  console.log(createResponse);
  return await createResponse.json();
}

export function getRTCConfiguration() {
  let config = {};
  config.sdpSemantics = 'unified-plan';
  config.iceServers = getServers();
  return config;
}
