import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

// Enable MobX strict Mode
configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistery = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial: boolean = false;
  @observable submitting: boolean = false;
  @observable target: string = "";

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistery.values())
    );
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = new Date(activity.date);
          this.activityRegistery.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  getActivity = (id: string) => {
    return this.activityRegistery.get(id);
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("Getting Activity", () => {
          activity.date = new Date(activity.date);
          this.activity = activity;
          this.activityRegistery.set(activity.id, activity);
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("Getting Activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("Creating an activity", () => {
        this.activityRegistery.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error.response);
      toast.error("One or more fields are missing!");
      runInAction("Creating an activity error", () => {
        this.submitting = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("Editing an activity", () => {
        this.activityRegistery.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error);
      toast.error("One or more fields are missing!");

      runInAction("Editing an activity error", () => {
        this.submitting = false;
      });
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("Deleting an activity", () => {
        this.activityRegistery.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      console.log(error);
      runInAction("Deleting an activity error", () => {
        this.submitting = false;
        this.target = "";
      });
    }
  };
}

export default createContext(new ActivityStore());
