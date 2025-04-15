"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Activity } from "@/types/resume";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface ActivitiesFormProps {
  activities: Activity[];
  updateActivities: (activities: Activity[]) => void;
}

export function ActivitiesForm({ activities, updateActivities }: ActivitiesFormProps) {
  const addActivity = () => {
    updateActivities([
      ...activities,
      {
        title: "",
        organization: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeActivity = (index: number) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    updateActivities(newActivities);
  };

  const updateActivityItem = (index: number, field: keyof Activity, value: string) => {
    const newActivities = [...activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    updateActivities(newActivities);
  };

  const moveActivity = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === activities.length - 1)
    ) {
      return;
    }

    const newActivities = [...activities];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    [newActivities[index], newActivities[newIndex]] = [
      newActivities[newIndex],
      newActivities[index],
    ];

    updateActivities(newActivities);
  };

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveActivity(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveActivity(index, "down")}
                disabled={index === activities.length - 1}
                className="h-8 w-8"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeActivity(index)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`activity-title-${index}`}>
                  Activity/Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`activity-title-${index}`}
                  value={activity.title}
                  onChange={(e) => updateActivityItem(index, "title", e.target.value)}
                  placeholder="Volunteer Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`activity-org-${index}`}>
                  Organization <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`activity-org-${index}`}
                  value={activity.organization}
                  onChange={(e) => updateActivityItem(index, "organization", e.target.value)}
                  placeholder="Code for Good"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor={`activity-location-${index}`}>Location</Label>
                <Input
                  id={`activity-location-${index}`}
                  value={activity.location}
                  onChange={(e) => updateActivityItem(index, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`activity-start-${index}`}>Start Date</Label>
                <Input
                  id={`activity-start-${index}`}
                  value={activity.startDate}
                  onChange={(e) => updateActivityItem(index, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`activity-end-${index}`}>End Date</Label>
                <Input
                  id={`activity-end-${index}`}
                  value={activity.endDate}
                  onChange={(e) => updateActivityItem(index, "endDate", e.target.value)}
                  placeholder="MM/YYYY or 'Present'"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`activity-desc-${index}`}>Description</Label>
              <Textarea
                id={`activity-desc-${index}`}
                value={activity.description}
                onChange={(e) => updateActivityItem(index, "description", e.target.value)}
                placeholder="Describe your role, responsibilities, and achievements..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addActivity} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Activity
      </Button>

      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Tips for activities section:</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5">
          <li>Include leadership roles and major achievements.</li>
          <li>Keep descriptions concise and impact-focused.</li>
          <li>Use action verbs to highlight contributions.</li>
        </ul>
      </div>
    </div>
  );
}
