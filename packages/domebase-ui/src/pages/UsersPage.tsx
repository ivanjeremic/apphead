import { columns, type Payment } from "@/components/common/data-table/columns";
import { DataTable } from "@/components/common/data-table/data-table";

function getData(): Payment[] {
	// Fetch data from your API here.
	return [
		{
			id: "a1f3c2d0",
			amount: 10,
			status: "pending",
			email: "user1@example.com",
		},
		{
			id: "b2e4d3f1",
			amount: 20,
			status: "failed",
			email: "user2@example.com",
		},
		{
			id: "c3f5e4g2",
			amount: 30,
			status: "processing",
			email: "user3@example.com",
		},
		{
			id: "d4g6f5h3",
			amount: 40,
			status: "pending",
			email: "user4@example.com",
		},
		{
			id: "e5h7g6i4",
			amount: 50,
			status: "failed",
			email: "user5@example.com",
		},
		{
			id: "f6i8h7j5",
			amount: 60,
			status: "processing",
			email: "user6@example.com",
		},
		{
			id: "g7j9i8k6",
			amount: 70,
			status: "pending",
			email: "user7@example.com",
		},
		{
			id: "h8k0j9l7",
			amount: 80,
			status: "failed",
			email: "user8@example.com",
		},
		{
			id: "i9l1k0m8",
			amount: 90,
			status: "processing",
			email: "user9@example.com",
		},
		{
			id: "j0m2l1n9",
			amount: 100,
			status: "pending",
			email: "user10@example.com",
		},
		{
			id: "k1n3m2o0",
			amount: 110,
			status: "failed",
			email: "user11@example.com",
		},
		{
			id: "l2o4n3p1",
			amount: 120,
			status: "processing",
			email: "user12@example.com",
		},
		{
			id: "m3p5o4q2",
			amount: 130,
			status: "pending",
			email: "user13@example.com",
		},
		{
			id: "n4q6p5r3",
			amount: 140,
			status: "failed",
			email: "user14@example.com",
		},
		{
			id: "o5r7q6s4",
			amount: 150,
			status: "processing",
			email: "user15@example.com",
		},
		{
			id: "p6s8r7t5",
			amount: 160,
			status: "pending",
			email: "user16@example.com",
		},
		{
			id: "q7t9s8u6",
			amount: 170,
			status: "failed",
			email: "user17@example.com",
		},
		{
			id: "r8u0t9v7",
			amount: 180,
			status: "processing",
			email: "user18@example.com",
		},
		{
			id: "s9v1u0w8",
			amount: 190,
			status: "pending",
			email: "user19@example.com",
		},
		{
			id: "t0w2v1x9",
			amount: 200,
			status: "failed",
			email: "user20@example.com",
		},
		{
			id: "u1x3w2y0",
			amount: 210,
			status: "processing",
			email: "user21@example.com",
		},
		{
			id: "v2y4x3z1",
			amount: 220,
			status: "pending",
			email: "user22@example.com",
		},
		{
			id: "w3z5y4a2",
			amount: 230,
			status: "failed",
			email: "user23@example.com",
		},
		{
			id: "x4a6z5b3",
			amount: 240,
			status: "processing",
			email: "user24@example.com",
		},
		{
			id: "y5b7a6c4",
			amount: 250,
			status: "pending",
			email: "user25@example.com",
		},
		{
			id: "z6c8b7d5",
			amount: 260,
			status: "failed",
			email: "user26@example.com",
		},
		{
			id: "a7d9c8e6",
			amount: 270,
			status: "processing",
			email: "user27@example.com",
		},
		{
			id: "b8e0d9f7",
			amount: 280,
			status: "pending",
			email: "user28@example.com",
		},
		{
			id: "c9f1e0g8",
			amount: 290,
			status: "failed",
			email: "user29@example.com",
		},
		{
			id: "d0g2f1h9",
			amount: 300,
			status: "processing",
			email: "user30@example.com",
		},
		{
			id: "e1h3g2i0",
			amount: 310,
			status: "pending",
			email: "user31@example.com",
		},
		{
			id: "f2i4h3j1",
			amount: 320,
			status: "failed",
			email: "user32@example.com",
		},
		{
			id: "g3j5i4k2",
			amount: 330,
			status: "processing",
			email: "user33@example.com",
		},
		{
			id: "h4k6j5l3",
			amount: 340,
			status: "pending",
			email: "user34@example.com",
		},
		{
			id: "i5l7k6m4",
			amount: 350,
			status: "failed",
			email: "user35@example.com",
		},
		{
			id: "j6m8l7n5",
			amount: 360,
			status: "processing",
			email: "user36@example.com",
		},
		{
			id: "k7n9m8o6",
			amount: 370,
			status: "pending",
			email: "user37@example.com",
		},
		{
			id: "l8o0n9p7",
			amount: 380,
			status: "failed",
			email: "user38@example.com",
		},
		{
			id: "m9p1o0q8",
			amount: 390,
			status: "processing",
			email: "user39@example.com",
		},
		{
			id: "n0q2p1r9",
			amount: 400,
			status: "pending",
			email: "user40@example.com",
		},
		{
			id: "o1r3q2s0",
			amount: 410,
			status: "failed",
			email: "user41@example.com",
		},
		{
			id: "p2s4r3t1",
			amount: 420,
			status: "processing",
			email: "user42@example.com",
		},
		{
			id: "q3t5s4u2",
			amount: 430,
			status: "pending",
			email: "user43@example.com",
		},
		{
			id: "r4u6t5v3",
			amount: 440,
			status: "failed",
			email: "user44@example.com",
		},
		{
			id: "s5v7u6w4",
			amount: 450,
			status: "processing",
			email: "user45@example.com",
		},
		{
			id: "t6w8v7x5",
			amount: 460,
			status: "pending",
			email: "user46@example.com",
		},
		{
			id: "u7x9w8y6",
			amount: 470,
			status: "failed",
			email: "user47@example.com",
		},
		{
			id: "v8y0x9z7",
			amount: 480,
			status: "processing",
			email: "user48@example.com",
		},
		{
			id: "w9z1y0a8",
			amount: 490,
			status: "pending",
			email: "user49@example.com",
		},
		{
			id: "x0a2z1b9",
			amount: 500,
			status: "failed",
			email: "user50@example.com",
		},
		{
			id: "y1b3a2c0",
			amount: 510,
			status: "processing",
			email: "user51@example.com",
		},
		{
			id: "z2c4b3d1",
			amount: 520,
			status: "pending",
			email: "user52@example.com",
		},
		{
			id: "a3d5c4e2",
			amount: 530,
			status: "failed",
			email: "user53@example.com",
		},
		{
			id: "b4e6d5f3",
			amount: 540,
			status: "processing",
			email: "user54@example.com",
		},
		{
			id: "c5f7e6g4",
			amount: 550,
			status: "pending",
			email: "user55@example.com",
		},
		{
			id: "d6g8f7h5",
			amount: 560,
			status: "failed",
			email: "user56@example.com",
		},
		{
			id: "e7h9g8i6",
			amount: 570,
			status: "processing",
			email: "user57@example.com",
		},
		{
			id: "f8i0h9j7",
			amount: 580,
			status: "pending",
			email: "user58@example.com",
		},
		{
			id: "g9j1i0k8",
			amount: 590,
			status: "failed",
			email: "user59@example.com",
		},
		{
			id: "h0k2j1l9",
			amount: 600,
			status: "processing",
			email: "user60@example.com",
		},
		{
			id: "i1l3k2m0",
			amount: 610,
			status: "pending",
			email: "user61@example.com",
		},
		{
			id: "j2m4l3n1",
			amount: 620,
			status: "failed",
			email: "user62@example.com",
		},
		{
			id: "k3n5m4o2",
			amount: 630,
			status: "processing",
			email: "user63@example.com",
		},
		{
			id: "l4o6n5p3",
			amount: 640,
			status: "pending",
			email: "user64@example.com",
		},
		{
			id: "m5p7o6q4",
			amount: 650,
			status: "failed",
			email: "user65@example.com",
		},
	];
}

export function UsersPage() {
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={getData()} />
		</div>
	);
}
