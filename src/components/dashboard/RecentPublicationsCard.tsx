import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Publication = {
  type: string;
  title: string;
  department: string;
  published: string;
  author: string;
};

const publications: Publication[] = [
  {
    type: "Memo",
    title: "SF Health Dept Compliance Requirements",
    department: "7.1 Legal Governance",
    published: "1/13/2026",
    author: "Sarah Chen",
  },
  {
    type: "Policy",
    title: "Privacy Policy v3.0 - GDPR Updates",
    department: "7.2 Platform Policies",
    published: "1/14/2026",
    author: "Michael Torres",
  },
];

function RecentPublicationsCard() {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <CardTitle>Recent Publications</CardTitle>
        </div>

        <p className="text-sm text-slate-500">
          Latest memos, policies, and reports
        </p>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publications.map((publication) => (
              <TableRow key={publication.title}>
                <TableCell>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {publication.type}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-slate-900">
                  {publication.title}
                </TableCell>
                <TableCell>{publication.department}</TableCell>
                <TableCell>{publication.published}</TableCell>
                <TableCell>{publication.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentPublicationsCard;
