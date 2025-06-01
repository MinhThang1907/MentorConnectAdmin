"use server";
import { db } from "./firebase-admin-config";

// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

export async function getUsers() {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getSessions() {
  try {
    const sessionsSnapshot = await db
      .collection("sessions")
      .orderBy("createdAt", "desc")
      .get();
    const sessions = [];

    for (const doc of sessionsSnapshot.docs) {
      const sessionData = doc.data();

      const mentorDoc = await db
        .collection("users")
        .doc(sessionData.mentorId)
        .get();
      const menteeDoc = await db
        .collection("users")
        .doc(sessionData.menteeId)
        .get();

      sessions.push({
        id: doc.id,
        ...sessionData,
        mentor: mentorDoc.exists
          ? {
              ...mentorDoc.data(),
              createdAt: mentorDoc.data()?.createdAt?.toDate().toISOString(),
              updatedAt: mentorDoc.data()?.updatedAt?.toDate().toISOString(),
            }
          : null,
        mentee: menteeDoc.exists
          ? {
              ...menteeDoc.data(),
              createdAt: menteeDoc.data()?.createdAt?.toDate().toISOString(),
              updatedAt: menteeDoc.data()?.updatedAt?.toDate().toISOString(),
            }
          : null,
        createdAt: sessionData.createdAt?.toDate().toISOString(),
        updatedAt: sessionData.updatedAt?.toDate().toISOString(),
        scheduledAt: sessionData.scheduledAt?.toDate().toISOString(),
      });
    }

    return sessions;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
}

export async function updateUserStatus(userId: string, status: string) {
  try {
    await db.collection("users").doc(userId).update({
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
}

export async function getAnalytics() {
  try {
    const usersSnapshot = await db.collection("users").get();
    const totalUsers = usersSnapshot.size;

    const sessionsSnapshot = await db.collection("sessions").get();
    const totalSessions = sessionsSnapshot.size;

    const activeSessionsSnapshot = await db
      .collection("sessions")
      .where("status", "==", "confirmed")
      .get();
    const activeSessions = activeSessionsSnapshot.size;

    const recentSessions = sessionsSnapshot.docs.slice(0, 5).map((doc) => ({
      id: doc.id,
      title: doc.data().title || "Mentoring Session",
      mentorName: "John Doe",
      menteeName: "Jane Smith",
      duration: doc.data().duration || 60,
    }));

    return {
      totalUsers,
      totalSessions,
      activeSessions,
      monthlyRevenue: 15000,
      userGrowth: 12,
      sessionGrowth: 8,
      revenueGrowth: 15,
      growthRate: 12,
      recentSessions,
      completionRate: 85,
      averageRating: 4.6,
      responseTime: 2,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}

export async function getDetailedAnalytics() {
  try {
    const analytics = await getAnalytics();

    // Additional detailed analytics
    const userGrowthData = [
      { month: "Jan", users: 400 },
      { month: "Feb", users: 300 },
      { month: "Mar", users: 500 },
      { month: "Apr", users: 280 },
      { month: "May", users: 590 },
      { month: "Jun", users: 320 },
    ];

    const sessionData = [
      { date: "2024-01", sessions: 120 },
      { date: "2024-02", sessions: 150 },
      { date: "2024-03", sessions: 180 },
      { date: "2024-04", sessions: 200 },
      { date: "2024-05", sessions: 250 },
      { date: "2024-06", sessions: 300 },
    ];

    const revenueData = [
      { month: "Jan", revenue: 12000 },
      { month: "Feb", revenue: 15000 },
      { month: "Mar", revenue: 18000 },
      { month: "Apr", revenue: 22000 },
      { month: "May", revenue: 25000 },
      { month: "Jun", revenue: 28000 },
    ];

    return {
      ...analytics,
      totalRevenue: 150000,
      activeUsers: 1250,
      monthlySessions: 450,
      averageRating: 4.6,
      revenueGrowth: 15,
      userGrowth: 12,
      sessionGrowth: 8,
      ratingImprovement: 2,
      userGrowthData,
      sessionData,
      revenueData,
      totalMentors: 320,
      totalMentees: 930,
      mentorMenteeRatio: 2.9,
      activeThisMonth: 850,
      completedSessions: 1200,
      cancelledSessions: 45,
      noShowRate: 3.2,
      mrr: 28000,
      arpu: 22.4,
      platformCommission: 4200,
      mentorPayouts: 23800,
      avgSessionDuration: 65,
      retentionRate: 78,
      avgResponseTime: 2.5,
    };
  } catch (error) {
    console.error("Error fetching detailed analytics:", error);
    throw error;
  }
}
