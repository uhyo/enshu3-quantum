# for annealing-steps
fid=-1;
fid2=-1;
fid3=-1;
fid4=-1;
fid5=-1;
fid = fopen('../data/steps/6-6.txt', 'r', 'native');
#fid2 = fopen('../data/steps/6-6-150.txt', 'r', 'native');
#fid3 = fopen('../data/steps/6-6-100.txt', 'r', 'native');
#fid4 = fopen('../data/steps/6-6-75.txt', 'r', 'native');
#fid5 = fopen('../data/steps/6-6-50.txt', 'r', 'native');
fid2 = fopen('../data/steps/6-6-w0.txt', 'r', 'native');
fid3 = fopen('../data/steps/6-6-w1.txt', 'r', 'native');

data = fscanf(fid, '%d %d',[2, Inf]);
if fid2 >= 0
	data2 = fscanf(fid2, '%d %d',[2, 180]);
end
if fid3 >= 0
	data3 = fscanf(fid3, '%d %d',[2, Inf]);
end
if fid4 >= 0
	data4 = fscanf(fid4, '%d %d',[2, Inf]);
end
if fid5 >= 0
	data5 = fscanf(fid5, '%d %d',[2, Inf]);
end

figure(1);
clf;
hold on;
plot(data(1,:), data(2,:), 'r-', 'linewidth', 3);
if fid2 >= 0
	plot(data2(1,:), data2(2,:), 'b-', 'linewidth', 3);
end
if fid3 >= 0
	plot(data3(1,:), data3(2,:), 'g-', 'linewidth', 3, 'color', [0.35 0.8 0.35]);
end
if fid4 >= 0
	plot(data4(1,:), data4(2,:), 'm-', 'linewidth', 3);
end
if fid5 >= 0
	plot(data5(1,:), data5(2,:), 'c-', 'linewidth', 3, 'color', [0.2 0.2 0.2]);
end

# axis([0, 200, 0, 100]);

set(gca, 'fontsize', 20);

hx = xlabel('t');
#set(hx, 'fontsize', 14);

