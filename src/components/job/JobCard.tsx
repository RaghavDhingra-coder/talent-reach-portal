
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Clock, MapPin } from "lucide-react";
import { type Job } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const JobCard = ({ job, compact }: JobCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });

  return (
    <div className={`rounded-lg border bg-card p-5 shadow-sm ${compact ? '' : 'hover:shadow-md transition-shadow'}`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-12 w-12 flex-shrink-0 rounded bg-muted flex items-center justify-center font-bold text-xl text-primary">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium line-clamp-1">
              <Link to={`/jobs/${job.id}`} className="hover:text-primary">
                {job.title}
              </Link>
            </h3>
            <div className="mt-1 flex flex-wrap gap-y-1 text-sm text-muted-foreground">
              <span>{job.company}</span>
              <span className="mx-2">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </span>
            </div>
          </div>
        </div>
        {!compact && (
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {!compact && (
        <div className="mt-4 line-clamp-2 text-sm text-muted-foreground">
          {job.description.substring(0, 150)}...
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="outline">{job.type}</Badge>
        <Badge variant="outline">{job.category}</Badge>
        {job.featured && <span className="job-tag job-tag-featured">Featured</span>}
        {job.urgent && <span className="job-tag job-tag-urgent">Urgent</span>}
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> {timeAgo}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
