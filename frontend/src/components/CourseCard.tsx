import { Book, Clock, Calendar } from 'lucide-react';

interface CourseProps {
  courseId: string;
  title: string;
  description: string;
  offeredBy: string;
  offeredTo: string;
  duration: string;
  schedule: string;
}

const CourseCard: React.FC<CourseProps> = ({
  courseId,
  title,
  description,
  offeredBy,
  offeredTo,
  duration,
  schedule
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-600 mb-2">
        <Book className="inline-block w-5 h-5 mr-2" /> {courseId}
      </p>
      <p className="text-gray-600 mb-2">
        Offered By: {offeredBy}
      </p>
      <p className="text-gray-600 mb-2">
        Offered To: {offeredTo}
      </p>
      <div className="flex items-center text-gray-600 mb-2">
        <Clock className="w-5 h-5 mr-2" />
        <span>{duration}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Calendar className="w-5 h-5 mr-2" />
        <span>{schedule}</span>
      </div>
    </div>
  );
};

export default CourseCard;
