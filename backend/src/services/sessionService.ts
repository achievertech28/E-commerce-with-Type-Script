import Session from "../models/sessionModel.ts";

export const deleteSessionFromDB = async (sessionId: string): Promise<void> => {
  const deletedSession = await Session.findByIdAndDelete(sessionId);

  if (!deletedSession) {
    throw new Error("session not found or alread deleted");
  }

  console.log(`session document with id: ${sessionId} successfully terminated`);

  return Promise.resolve();
};
