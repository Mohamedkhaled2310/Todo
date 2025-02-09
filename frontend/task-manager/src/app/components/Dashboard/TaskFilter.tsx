interface TaskFilterProps {
    filter: string;
    setFilter: (value: string) => void;
  }
  
  export default function TaskFilter({ filter, setFilter }: TaskFilterProps) {
    return (
      <form className="flex justify-end items-center gap-4 mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-700 rounded-md bg-gray-700"
        >
          <option value="">Filter by category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="urgent">Urgent</option>
          <option value="other">Other</option>
        </select>
      </form>
    );
  }